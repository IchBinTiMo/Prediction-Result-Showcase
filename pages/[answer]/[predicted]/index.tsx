/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'
import result from "../../../testResult.json";
import styles from '../../../styles/Home.module.css'
import { useState } from 'react';

export default function Cases(){
    const router = useRouter();
    const [imgShown, setImgShown] = useState("");
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    const {
        query: {answer, predicted, color},
    } = router;

    let res: Record<string, Record<string, string[]>> = result;

    let ans: string = (answer as string).toLocaleLowerCase();
    let pre: string = (predicted as string).toLocaleLowerCase();
    let cases: string[] = res[ans][pre];
    let imgsrc = ""


    

    const resetSize = () => {
        if(height !== 0 && width !== 0){
            let iimg = document.getElementById("img") as HTMLElement;
            let img = document.getElementById("img") as HTMLImageElement;
            let w = img.naturalWidth;
            let h = img.naturalHeight;
            
            iimg.style.width = `${w}px`;
            iimg.style.height = `${h}px`;

        }
    };

    const changeImage = (e: any) => {
        let target = e.target as HTMLInputElement;
        let text = target.textContent;

        setImgShown(`/test/${ans}/${text}`);
        imgsrc = `/test/${ans}/${text}`;


        let img = document.getElementById("img") as HTMLImageElement;
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        setHeight(h);
        setWidth(w);
        img.style.width = `${w}px`;
        img.style.height = `${h}px`;
        console.log(w, h, imgsrc);
       

    };

    let startX = 0;
    let startY = 0;

    const handleDragStart = function(event: any) {
        startX = event.x;
        startY = event.y;
    }

    const handleDrag = function(event: any) {
        let src = document.getElementById("img") as HTMLElement;
        if (event.clientX > 0 && event.clientY > 0) {
            src.style.width = src.clientWidth + (event.clientX - startX) + "px";
            startX = event.clientX;
            
            src.style.height = src.clientHeight + (event.clientY - startY) + "px";
            startY = event.clientY;
        }
      }

    const highlightImage = () => {
        let checkbox = document.getElementById("highlight") as HTMLInputElement;

        let img = document.getElementById("img") as HTMLImageElement;
        let src = img.src;
        let newSrc = "";
        console.log(checkbox.checked, src)
        
        if(checkbox.checked === false){
            // console.log(`/test/${ans}/failed${src.split("failed")[1].split(".")[0]}.png`);
            newSrc = `/highlight_set/test/${ans}/failed${src.split("failed")[1].split(".")[0]}h.png`;
        }
        else{
            // console.log(`/highlight_set/test/${ans}/failed${src.split("failed")[1].split(".")[0]}.png`);
            newSrc = `/test/${ans}/failed${src.split("failed")[1].split("h")[0]}.png`;
        }

        setImgShown(newSrc);
    };

    

    let caseList = cases.map((cas, idx) => 
        <li key={cas} className={styles.imgItem}>
            <input type="radio" name="case" id={`case_${idx}`} />
            <label htmlFor={`case_${idx}`} className={`h-full w-full flex justify-center items-center text-center`} onClick={changeImage}>
                {cas}
            </label>
        </li>);


    

    return (
        <>
            
            <main className={styles.main}>
                <div className={styles.imgDiv}>
                    <img src={imgShown} alt="" className={styles.img} id="img" draggable="true" onDragStart={handleDragStart} onDrag={handleDrag}/>
                    
                </div>         
                
            </main>
            <div className={styles.sidebar}>
                <div className={styles.tool}>
                    <li className=' col-start-1 col-span-1 row-start-1 row-span-1'>
                        <Link href="/" className={styles.toolItem}>Home</Link>
                    </li>
                    <li className=' col-start-2 col-span-1 row-start-1 row-span-1'>
                        <input type="checkbox" name="" id="highlight" className={`${styles.checkHighlight}`} />
                        <label htmlFor="highlight" className={`${styles.highlight} ${styles.toolItem}`} onClick={highlightImage}>&nbsp;</label>
                    </li>
                    <li className=' col-start-2 col-span-1 row-start-1 row-span-1'>
                        <label htmlFor="highlight" className={styles.toolItem} onClick={highlightImage}>Highlight</label>
                    </li>
                    <li className='group col-start-3 col-span-1 row-start-1 row-span-1'>
                        <span className={styles.toolItem} onClick={resetSize}>Reset</span>
                        
                    </li>

                    <li className='group col-start-4 col-span-1 row-start-1 row-span-1'>
                        <span className={`${styles.toolItem} ${styles.imgLabel}`}>Images</span>

                        <div className={`${styles.imgCatalogTitle} group-hover:grid`}>Total: {caseList.length}</div>
                        
                        <div className={`${styles.imgCatalog} group-hover:grid mt-8 bg-neutral-900 bg-opacity-80`}>                            
                            <ul className={`text-base`}>
                                {caseList}
                            </ul>
                        </div>
                       
                    </li>

                    <li className=' col-start-9 col-span-2 row-start-1 row-span-1'>
                        <span className={`${color} rounded-lg border-x-8 border-t-0 border-b-8 border-transparent flex justify-center items-center`}>Answer: {answer}</span>
                    </li>

                    <li className=' col-start-11 col-span-2 row-start-1 row-span-1'>
                        <span className={`${color} rounded-lg border-x-8 border-t-0 border-b-8 border-transparent flex justify-center items-center`}>Predicted: {predicted}</span>
                    </li>

                </div>
            </div>
        </>
    );
}