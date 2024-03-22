interface SelectedCompanyProps {
  selectedCompany: {
    symbol: string;
    desc: string;
  };
}

const SelectedCompany = ({ selectedCompany }: SelectedCompanyProps) => {
  return (
    <div className="selected-company">
      <p>
        Symbol:{" "}
        <span className="selected-company-symbol">
          {selectedCompany.symbol}
        </span>
      </p>
      <p>{`${selectedCompany.desc}`}</p>
    </div>
  );
};

export default SelectedCompany;
