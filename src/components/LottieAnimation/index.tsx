'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { Dispatch, Ref, useEffect, useState } from 'react';

import Skeleton from '../Skeleton';

type LottieAnimationProps = {
    importAnimation: (cb: Dispatch<any>) => void;
    lottieProps?: Record<string, any>;
    onLoaded?: () => void;
    lottieRef?: Ref<any>; 
};
const LottieAnimation = ({ importAnimation, lottieProps = {}, onLoaded, lottieRef }: LottieAnimationProps) => {
    const [animationData, setAnimationData] = useState<any>();
    const [Lottie, setLottie] = useState<any>();
    
    useEffect(() => {
        importAnimation(setAnimationData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        import('lottie-react/build/index').then((l) => setLottie(l));
    }, []);

    useEffect(() => {
        if (Lottie && animationData) {
            onLoaded?.();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Lottie, animationData]);

    if (!Lottie || !animationData) return (
        <Skeleton style={{
            height: lottieProps?.style?.height,
            width: lottieProps?.style?.height
        }} className='rounded-lg'/>
    )
    
    return <Lottie.default ref={lottieRef} animationData={animationData} {...lottieProps} />;
};
export default LottieAnimation;
