import { useState } from 'react';

import { defaultBorderBoxAttributes } from './constants';
import './Prism.css';

type BorderBoxAttribute = {
  name: string;
  unit: 'px' | 'pt' | null;
  value: number | null;
};

type PrismProps = {
  borderBoxAttributes?: BorderBoxAttribute[];
};

export const Prism = ({ borderBoxAttributes }: PrismProps) => {
  /* this [attriburtes, setAttributes] useState hook is used in lieu of real props being passed
  and an API method to mutate the contained values (or a global store to hold such values) */
  const [attriburtes, setAttributes] = useState(
    () => borderBoxAttributes ?? defaultBorderBoxAttributes,
  );

  const [selectedAttribute, setSelectedAttribute] =
    useState<BorderBoxAttribute | null>(null);

  const updateAttributes = (index: number, attribute: BorderBoxAttribute) => {
    const name = attribute.name;
    const unit = attribute?.unit !== null ? attribute?.unit : 'px';
    const value = attribute?.value !== null ? attribute.value : 0;
    setAttributes([
      ...attriburtes.slice(0, index),
      { name, value, unit },
      ...attriburtes.slice(index + 1),
    ]);
  };

  return (
    <div className="prism-container">
      <div className="prism-ct" />

      {attriburtes.map((attribute, index) => {
        const isSelected = selectedAttribute?.name === attribute.name;
        const originalAttributeState = defaultBorderBoxAttributes[index];

        const isDirty = () =>
          originalAttributeState?.unit !== attribute?.unit ||
          originalAttributeState?.value !== attribute?.value;

        return (
          <div
            className={`prism-${attribute?.name}`}
            key={attribute?.name + index}>
            <div
              onClick={() => {
                if (selectedAttribute?.name !== attribute.name) {
                  setSelectedAttribute(attribute);
                }
              }}
              className={`${
                isSelected ? 'prism-attribute-container-selected' : ''
              } ${
                !isSelected && isDirty()
                  ? 'prism-attribute-container-is-dirty'
                  : 'prism-attribute-container-unselected'
              }`}>
              {isSelected ? (
                <form
                  className={'prism-form'}
                  onSubmit={(e) => {
                    e.preventDefault();
                    /* updateAttributes would likely be an API mutation
                      or a global store mutation and not a local state update */
                    updateAttributes(index, selectedAttribute);
                    setSelectedAttribute(null);
                  }}>
                  <input
                    autoFocus
                    onFocus={(e) => e.preventDefault()}
                    className={'prism-value-selected'}
                    value={
                      selectedAttribute?.value !== null
                        ? selectedAttribute?.value
                        : ''
                    }
                    onChange={({ target: { value } }) => {
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
                    onChange={({ target: { value } }) => {
                      setSelectedAttribute({
                        ...selectedAttribute,
                        unit: value as BorderBoxAttribute['unit'],
                      });
                    }}
                    value={
                      selectedAttribute?.unit !== null
                        ? selectedAttribute?.unit
                        : 'px'
                    }>
                    <option value="px">px</option>
                    <option value="pt">pt</option>
                  </select>
                </form>
              ) : (
                <>
                  <span>{attribute?.value ?? 'auto'}</span>
                  <span className="prism-unit-unselected">
                    {attribute?.unit ?? ''}
                  </span>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
