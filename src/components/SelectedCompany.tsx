interface SelectedCompanyProps {
  selectedCompany: {
    symbol: string;
    desc: string;
  };
  closePrice: string;
}

const SelectedCompany = ({
  selectedCompany,
  closePrice,
}: SelectedCompanyProps) => {
  return (
    <div className="selected-company">
      <p>
        Symbol: <span className="gold">{selectedCompany.symbol}</span> | Close:{" "}
        <span className="gold">{closePrice}</span>
      </p>
      <p>{`${selectedCompany.desc}`}</p>
    </div>
  );
};

export default SelectedCompany;
