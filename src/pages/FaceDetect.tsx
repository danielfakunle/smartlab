import { motion } from 'framer-motion';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { imageLinkIcon } from '../assets';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useWindowSize } from '../hooks/useWindowSize';
import detectFace from '../utils/detectFace';

type BoundingBox = {
  top_row: number;
  bottom_row: number;
  left_col: number;
  right_col: number;
};

type DataRegions = {
  data: {};
  id: string;
  region_info: {
    bounding_box: BoundingBox;
  };
  value: number;
}[];

type DisplayInfo = {
  left: number;
  top: number;
  width: number;
  height: number;
}[];

function FaceDetect() {
  const [imageUrl, setImageUrl] = useState('');
  const [dataRegions, setDataRegions] = useState<DataRegions>([]);
  const [displayInfo, setDisplayInfo] = useState<any[]>([]);
  const windowSize = useWindowSize();
  const image = useRef<HTMLImageElement>(null!);
  const contentBox = useRef<HTMLDivElement>(null!);

  const handleImageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    image.current.src = imageUrl;
    const response: DataRegions | null = await detectFace(imageUrl);
    if (response === null) {
      alert('Error detecting face. Make sure the url links to an image.');
    } else {
      setDataRegions(response);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  useEffect(() => {
    // If there are data regions...
    if (dataRegions.length !== 0) {
      // get bounding boxes...
      const boundingBoxes: BoundingBox[] = [
        ...Array(dataRegions.length).keys(),
      ].map((item, index) => {
        return {
          top_row: dataRegions[index].region_info.bounding_box.top_row,
          bottom_row: dataRegions[index].region_info.bounding_box.bottom_row,
          left_col: dataRegions[index].region_info.bounding_box.left_col,
          right_col: dataRegions[index].region_info.bounding_box.right_col,
        };
      });
      // get the difference in position between the image placeholder and the image
      const contentBoxRect = contentBox.current.getBoundingClientRect();
      const imageRect = image.current.getBoundingClientRect();
      const topBase = imageRect.top - contentBoxRect.top;
      const leftBase = imageRect.left - contentBoxRect.left;
      // get the display information for each box
      const displayInfo: DisplayInfo = boundingBoxes.map((box) => {
        return {
          left: leftBase + box.left_col * image.current.width,
          top: topBase + box.top_row * image.current.height,
          width: (box.right_col - box.left_col) * image.current.width,
          height: (box.bottom_row - box.top_row) * image.current.height,
        };
      });
      setDisplayInfo(displayInfo);
    }
  }, [dataRegions, windowSize]);

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Navbar type='app' page='home' />
        <main className='container h-full flex flex-col justify-center self-center space-y-8 px-4 md:px-6 mt-8 mb-16'>
          <div className='flex flex-col space-y-6 w-full h-fit items-center'>
            <div className='flex flex-col space-y-2'>
              <h1 className='text-2xl leading-none md:text-3xl text-gray-900 font-bold text-center'>
                Face Detection
              </h1>
              <h2 className='text-base md:text-lg text-gray-500 text-center'>
                Paste a link to your image below to detect a face.
              </h2>
            </div>
            <form
              onSubmit={handleImageSubmit}
              className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:justify-between w-full md:w-4/5 md:items-center'
            >
              <div className='relative w-full'>
                <input
                  className={`bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg w-full py-3 px-10`}
                  type='text'
                  name='imageLink'
                  placeholder='Image Link'
                  onChange={handleImageChange}
                />
                <img
                  className='inset-0 absolute left-4 top-[13px]'
                  src={imageLinkIcon}
                  alt=''
                />
              </div>
              <Button style='default' size='large' type='submit'>
                Detect
              </Button>
            </form>
          </div>
          <div className='flex flex-col items-center space-y-4 w-full'>
            <div
              ref={contentBox}
              className={`h-fit ${
                dataRegions.length !== 0 ? 'opacity-100' : 'opacity-0'
              } w-full lg:w-[800px] rounded-lg bg-gray-100 border-2 border-dashed border-gray-200 flex justify-center relative`}
            >
              <img ref={image} className={`object-contain rounded-md`} src='' />
              {displayInfo.map((item, index) => {
                return (
                  <motion.div
                    style={{
                      x: displayInfo[index].left,
                      y: displayInfo[index].top,
                      width: displayInfo[index].width,
                      height: displayInfo[index].height,
                    }}
                    className={`absolute inset-0 border-[3px] border-blue-700 rounded-md`}
                    key={index}
                  ></motion.div>
                );
              })}
            </div>
            <p className='text-gray-900 text-lg'>Your score: 2pts</p>
          </div>
        </main>
      </div>
      <Footer page='face-detect' type='app' />
    </>
  );
}

export default FaceDetect;
