import React, {useState, useEffect} from "react";

const ToTopButton = () =>{
    const [show,setshow] = useState(false);
    useEffect(() => {
        const handleScroll = () =>{
            if(window.scrollY > 300){
                setshow(true);
            }else{
                setshow(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return ()=>{
            window.removeEventListener('scroll', handleScroll);
        };
    },[]);

    const scrollToTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    
    return (
        <button
            style={{display: show ? 'block' : 'none'}}
            onClick={scrollToTop}
            className="to-top-button">
            To Top
        </button>
    );
};

export default ToTopButton;