import './styles.css';
import { BorderBoxAttribute } from '../../types';

type PrismFormProps = {
  selectedAttribute: BorderBoxAttribute;
  setSelectedAttribute: (selectedAttribute: BorderBoxAttribute) => void;
  index: number;
};

export const PrismForm = ({
  selectedAttribute,
  setSelectedAttribute,
  index,
}: PrismFormProps) => {
  return (
    <div className={'prism-form'}>
      <input
        autoFocus
        onFocus={(e) => e.preventDefault()}
        className={'prism-value-selected'}
        value={
          selectedAttribute?.value !== null ? selectedAttribute?.value : ''
        }
        onChange={(e) => {
          const {
            target: { value },
          } = e;

          if (/^\d+$/.test(value)) {
            setSelectedAttribute({
              ...selectedAttribute,
              value: +value,
            });
          }

          if (!value) {
            setSelectedAttribute({
              ...selectedAttribute,
              value: null,
            });
          }
        }}
      />
      <select
        className={'prism-unit-selected'}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          const {
            target: { value },
          } = e;

          setSelectedAttribute({
            ...selectedAttribute,
            unit: value as BorderBoxAttribute['unit'],
          });
        }}
        value={
          selectedAttribute?.unit !== null ? selectedAttribute.unit : 'px'
        }>
        <option value="px">px</option>
        <option value="pt">pt</option>
      </select>
    </div>
  );
};
