import { useNavigate } from 'react-router-dom';
import { arrowRight } from '../assets';
import Button from './Button';

type ModelCardProps = {
  info: {
    title: string;
    text: string;
    image: string;
  };
  page: string;
};

function ModelCard({ info, page }: ModelCardProps) {
  const navigate = useNavigate();
  return (
    <div className='w-fit ring-2 ring-gray-200 shadow-md rounded-lg'>
      <img className='rounded-t-lg' src={info.image} alt='' />
      <div className='flex flex-col space-y-3 p-5'>
        <div className='flex flex-col space-y-2'>
          <h3 className='leading-tight text-2xl font-bold'>{info.title}</h3>
          <p className='text-base font-normal text-gray-500'>{info.text}</p>
        </div>
        <Button
          type='button'
          size='large'
          style='default'
          className='flex w-fit'
        >
          Explore <img className='ml-1' src={arrowRight} alt='explore icon' />
        </Button>
      </div>
    </div>
  );
}

export default ModelCard;
