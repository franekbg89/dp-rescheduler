import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./CarouselNavButtons";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import styles from "./Carousel.module.scss";

interface CarouselProps<T> {
  slides: T[];
  renderSlide: (slide: T) => React.ReactNode;
  onClickNext: () => void;
  onClickPrevious: () => void;
  options?: EmblaOptionsType;
}

export const Carousel = <T,>({
  slides,
  renderSlide,
  onClickNext,
  onClickPrevious,
  options,
}: CarouselProps<T>) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const handleNextButtonClick = () => {
    onNextButtonClick();
    onClickNext();
  };

  const handlePreviousButtonClick = () => {
    onPrevButtonClick();
    onClickPrevious();
  };

  return (
    <div className={styles.embla}>
      <PrevButton
        onClick={handlePreviousButtonClick}
        disabled={prevBtnDisabled}
      />
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.embla__slide__number}>
                {renderSlide(slide)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <NextButton onClick={handleNextButtonClick} disabled={nextBtnDisabled} />
    </div>
  );
};
