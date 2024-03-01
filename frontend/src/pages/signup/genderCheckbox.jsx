// eslint-disable-next-line react/prop-types
const GenderCheckbox = ({ onChange, selected }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input
            type="radio"
            name="radio-1"
            className="radio border-slate-900"
            checked={selected === "male"}
            onChange={() => onChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            type="radio"
            name="radio-1"
            className="radio border-slate-900"
            checked={selected === "female"}
            onChange={() => onChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
