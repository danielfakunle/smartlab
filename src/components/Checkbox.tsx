type CheckboxProps = {
  id: string;
  label: string;
  className?: string;
};

function Checkbox({ id, label, className = '' }: CheckboxProps) {
  return (
    <div className={`space-x-2 items-center ${className}`}>
      <input
        className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-300'
        type='checkbox'
        id={id}
        required
      />
      <label className='text-xs leading-tight text-gray-900' htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
