'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useLottie } from 'lottie-react';
import React, { Ref, useEffect } from 'react';

import Skeleton from '../Skeleton';

type LottieAnimationProps = {
  importAnimation: (cb: (animationData: any) => void) => void;
  lottieProps?: Record<string, any>;
  onLoaded?: () => void;
  lottieRef?: Ref<any>;
  playAnimation?: boolean;
};

const LottieAnimation = ({
  importAnimation,
  lottieProps = {},
  onLoaded,
  lottieRef,
  playAnimation,
}: LottieAnimationProps) => {
  const [animationData, setAnimationData] = React.useState<any>(null);

  useEffect(() => {
    importAnimation(setAnimationData);
  }, [importAnimation]);

  const options = {
    animationData,
    ...lottieProps,
    lottieRef,
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { View, play } = useLottie(options);

  if (playAnimation) {
    play();
  }

  useEffect(() => {
    if (animationData) {
      onLoaded?.();
    }
  }, [animationData, onLoaded]);

  if (!animationData) {
    return (
      <Skeleton
        style={{
          height: lottieProps?.style?.height,
          width: lottieProps?.style?.height,
        }}
        className='rounded-lg'
      />
    );
  }

  return View;
};

export default LottieAnimation;
