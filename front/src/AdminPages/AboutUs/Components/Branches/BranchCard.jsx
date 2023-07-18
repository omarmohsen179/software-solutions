import { useTranslation } from "react-i18next";
function BranchCard({ res }) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="step-card-title">{res.CountryEn + ", " + res.CityEn}</div>
      <div>{res.AddressEn}</div>
    </div>
  );
}

export default BranchCard;
