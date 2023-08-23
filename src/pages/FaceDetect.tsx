import { motion } from 'framer-motion';
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { imageLinkIcon } from '../assets';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import LoadingContext from '../context/LoadingContext';
import UserContext from '../context/UserContext';
import { useWindowSize } from '../hooks/useWindowSize';
import { setUser } from '../utils/authUser';
import detectFace from '../utils/detectFace';

function FaceDetect() {
  const [imageUrl, setImageUrl] = useState('');
  const [dataRegions, setDataRegions] = useState<DataRegions>([]);
  const [displayInfo, setDisplayInfo] = useState<any[]>([]);
  const windowSize = useWindowSize();
  const image = useRef<HTMLImageElement>(null!);
  const contentBox = useRef<HTMLDivElement>(null!);

  const { loading, setLoading } = useContext(
    LoadingContext
  ) as LoadingContextType;
  const { currentUser, setCurrentUser } = useContext(
    UserContext
  ) as UserContextType;

  const handleImageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    image.current.src = imageUrl;
    const response: DataRegions | null = await detectFace(imageUrl);
    if (!response) {
      alert('Error detecting face. Make sure the url links to an image.');
      setLoading(false);
      setDisplayInfo([]);
    } else {
      setDataRegions(response);
      try {
        // updating entries
        const entriesResponse = await fetch(
          `${import.meta.env.VITE_SERVER_URL}facedetect`,
          {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: currentUser.id,
            }),
          }
        );
        const data = await entriesResponse.json();
        if (entriesResponse.status === 400) {
          alert(data);
        } else {
          setCurrentUser((prev: User) => ({ ...prev, entries: data.entries }));
        }
      } catch {
        alert('Error updating points');
      }
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };
  // set local storage to be user with updated entries
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    // If there are data regions...
    if (dataRegions) {
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
    setLoading(false);
    return () => {
      setLoading(true);
      setDisplayInfo([]);
    };
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
            {loading && <Loading />}
            <div
              ref={contentBox}
              className={`min-h-fit ${
                loading || !dataRegions ? 'opacity-0' : 'opacity-100'
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
            <p className='text-gray-900 text-lg'>
              Your score: {currentUser.entries}pts
            </p>
          </div>
        </main>
      </div>
      <Footer page='face-detect' type='app' />
    </>
  );
}

export default FaceDetect;
