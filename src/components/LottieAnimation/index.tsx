'use client';

import { Dispatch, useEffect, useState } from 'react';
const Animation = ({
    lottieProps,
    animationData,
    onLoaded,
}: {
    lottieProps?: Record<string, any>;
    animationData?: any;
    onLoaded?: () => void;
}) => {
    const [Lottie, setLottie] = useState<any>();
    useEffect(() => {
        import('lottie-react/build/index').then((l) => setLottie(l));
    }, []);
    useEffect(() => {
        if (Lottie && animationData) {
            onLoaded?.();
        }
    }, [Lottie, animationData]);
    if (!Lottie || !animationData) return <></>;
    return <Lottie.default loop animationData={animationData} {...lottieProps} />;
};
type LottieAnimationProps = {
    importAnimation: (cb: Dispatch<any>) => void;
    lottieProps?: Record<string, any>;
    onLoaded?: () => void;
};
const LottieAnimation = ({ importAnimation, lottieProps = {}, onLoaded }: LottieAnimationProps) => {
    const [animationData, setAnimationData] = useState<any>();
    useEffect(() => {
        importAnimation(setAnimationData);
    }, []);
    return <Animation lottieProps={lottieProps} animationData={animationData} onLoaded={onLoaded} />;
};
export default LottieAnimation;
