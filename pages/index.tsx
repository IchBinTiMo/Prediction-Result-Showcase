import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import result from "../testResult.json"
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  function buttonClicked(e: any){
    console.log(e.target.className);
    e.preventDefault();
    console.log("Clicked");
  }

  let total = 0;
  let correct = 0;
  let realCor = 0;
  let res: Record<string, Record<string, string[]>> = result;

  for(let ans of Object.keys(res)){
    for(let pre of Object.keys(res[ans])){
      total = total + res[ans][pre].length;
      if(ans === pre){
        correct = correct + res[ans][pre].length;
      }
      if(ans === "fail" && ans !== pre) continue;
      if(pre === "fail" && ans !== pre) continue;
      realCor = realCor + res[ans][pre].length;
    }
  }


  let contents = [
    "", "Pass", "Fine", "Fail",
    "Pass", "", "", "", 
    "Fine", "", "", "", 
    "Fail", "", "", ""
  ];

  let divs = contents.map( (content, idx) => {
    if(idx === 0){
      return (<div key={idx} className={`rounded text-xl ${styles.catalogIndex}`}>
                <div className=' grid grid-cols-2 grid-rows-2 h-full w-full'>
                  <div></div>
                  <div className='flex justify-center items-center text-center'>Answer</div>
                  <div className='flex justify-center items-center text-center'>Predicted</div>
                </div>
              </div>)
    }
    else if(idx % 4 === 0 || idx < 4){
      return <div key={idx} className={`${styles.catalogItem} ${styles.catalogIndex}`}>{content}</div>
    }
    else if(idx % 4 === 4 || Math.floor(idx / 4) === 4){
      return <div key={idx} className={`${styles.catalogItem} ${styles.catalogIndex}`}>{content}</div>
    }
    else{
      let answer: string = `${contents[idx % 4]}`;
      let predicted: string = `${contents[Math.floor(idx / 4)]}`
      if(idx % 4 === Math.floor(idx / 4)){
        return (<div key={idx} className={`${styles.catalogItem} ${styles.catalogGood} text-black`}>
                  <Link href={{
                    pathname: `/${answer}/${predicted}`,
                      query: {
                        answer,
                        predicted,
                        color: "text-green-300",
                        // imgs: res[answer.toLocaleLowerCase()][predicted.toLocaleLowerCase()]
                      }
                    }}>
                    {
                      `${res[answer.toLocaleLowerCase()][predicted.toLocaleLowerCase()].length} 
                      (${Math.round(res[answer.toLocaleLowerCase()][predicted.toLocaleLowerCase()].length * 10000 / total) / 100}%)`
                    }
                  </Link>
               </div>)
      }
      else if (idx % 4 + Math.floor(idx / 4) === 3){
        return (<div key={idx} className={`${styles.catalogItem} ${styles.catalogOK} text-black`}>
                  <Link href={{
                    pathname: `/${answer}/${predicted}`,
                      query: {
                        answer,
                        predicted,
                        color: "text-yellow-200",
                        // imgs: res[answer.toLocaleLowerCase()][predicted.toLocaleLowerCase()]
                      }
                    }}>
                    {
                      `${res[answer.toLocaleLowerCase()][predicted.toLocaleLowerCase()].length} 
                      (${Math.round(res[answer.toLocaleLowerCase()][predicted.toLocaleLowerCase()].length * 10000 / total) / 100}%)`
                    }
                    </Link>
                </div>)
      }
      return (<div key={idx} className={`${styles.catalogItem} ${styles.catalogBad} text-black`}>
                <Link href={{
                    pathname: `/${answer}/${predicted}`,
                      query: {
                        answer,
                        predicted,
                        color: "text-red-300",
                        // imgs: res[answer.toLocaleLowerCase()][predicted.toLocaleLowerCase()]
                      }
                    }}>
                    {
                      `${res[answer.toLocaleLowerCase()][predicted.toLocaleLowerCase()].length} 
                      (${Math.round(res[answer.toLocaleLowerCase()][predicted.toLocaleLowerCase()].length * 10000 / total) / 100}%)`
                    }
                  </Link>
              </div>)
    }
  });

  return (
    <>
      <main className={styles.main}>
        <div className='col-start-1 col-span-1 row-start-2 row-span-1 text-4xl flex justify-center text-right'>
          Accuracy: {Math.round(correct / total * 10000) / 100}% <br />
          {Math.round(realCor / total * 10000) / 100}%
          </div>
        <div  className='col-start-4 col-span-1 row-start-2 row-span-1 text-4xl flex justify-center text-right'>
          f1 score: {Math.round(0.8829576245581451 * 10000) / 100}% <br />
          {Math.round(0.9047250390263094 * 10000) / 100}%

        </div>
        <div className={styles.container}>
          <div className={styles.catalog}>
            {divs}
          </div>
        </div>
      </main>
    </>
  )
}
