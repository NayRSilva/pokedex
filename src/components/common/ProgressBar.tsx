interface ProgressProps {
  currentCount: number;
  totalCount: number;
}

const ProgressBar = ({ currentCount, totalCount }: ProgressProps) => {
  const percentage = Math.min((currentCount / totalCount) * 100, 100);
  return (
    <div className="w-full max-w-xl mx-auto text-center">
      <div className="bg-gray-300 rounded-full h-8 overflow-hidden">
        <div
          className="bg-teal-500 h-full text-center text-white font-bold leading-8 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        >
          {currentCount} / {totalCount} Pokémon
        </div>
      </div>
      <div className="mt-2 text-lg text-gray-700">{percentage.toFixed(2)}%</div>
    </div>
  );
};
export default ProgressBar;
