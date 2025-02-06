import { CircleX } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const InfoModal = ({ text, setInfoModal, position = 'top' }) => {

    // flash the modal
    const [bgColor, setBgColor] = useState('gray')
    const modalRef = useRef()
    const flashModal = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            const colors = [ "white", "gray", "white", "gray"];
            let index = 0;
            const interval = setInterval(() => {
                setBgColor(colors[index]);
                index = (index + 1) % colors.length;
            }, 100); // Change color every 100ms
            setTimeout(() => {
                clearInterval(interval);
                setBgColor('gray');
            }, 700);
        }
    }
    useEffect(() => {
        document.addEventListener('click', flashModal);
        document.addEventListener('scroll', flashModal);
        return () => {
            document.removeEventListener('click', flashModal);
            document.removeEventListener('scroll', flashModal);
        }
    }, [])

    // useEffect(() => {
    //     const colors = ["gray", "white", "gray", "white", "gray"];
    //     let index = 0;
    //     const interval = setInterval(() => {
    //         setBgColor(colors[index]);
    //         index = (index + 1) % colors.length;
    //     }, 300); // Change color every 300ms
    //     return () => clearInterval(interval); // Cleanup interval on component unmount
    // }, []);



    return (
        <div className='InfoModalContainer z-1 w-screen h-screen fixed top-0 right-0 flex justify-center' style={{ alignItems: `${position == 'middle' && 'center'}` }}>
            <div ref={modalRef} className="infoModal relative bg-gray-400 text-black w-[95%] sm:w-[600px] h-fit flex justify-center items-center text-center p-8 shadow-lg rounded-md" style={{ backgroundColor: bgColor }}>
                {text}
                <CircleX className='absolute top-2 right-2 cursor-pointer ' onClick={() => setInfoModal(false)} />
            </div>
        </div>
    )
}

export default InfoModal