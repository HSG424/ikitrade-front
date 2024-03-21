import loading from "/loading.svg";

interface LoadingProps {
  className?: string;
}

export const Loading = ({ className }: LoadingProps) => {
  return (
    <div className={`loading-container ${className}`}>
      <img src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
