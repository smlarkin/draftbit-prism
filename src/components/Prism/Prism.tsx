import { useState, useEffect, useCallback } from 'react';

import './styles.css';
import { BorderBoxAttribute } from './types';
import { PrismForm } from './PrismForm';
import { defaultBorderBoxAttributes } from '../../constants';
import { useAttributes } from '../../context';

type PrismProps = {
  borderBoxAttributes?: BorderBoxAttribute[];
};

export const Prism = ({ borderBoxAttributes }: PrismProps) => {
  const [attributes, setAttributes] = useAttributes();
  const [selectedAttribute, setSelectedAttribute] =
    useState<BorderBoxAttribute | null>(null);

  const getIsDirty = (
    originalAttribute: BorderBoxAttribute,
    newAttribute: BorderBoxAttribute,
  ) =>
    originalAttribute?.unit !== newAttribute?.unit ||
    originalAttribute?.value !== newAttribute?.value;

  const updateAttributes = useCallback(
    (attribute: BorderBoxAttribute) => {
      const index = attributes.findIndex(({ name }) => name === attribute.name);
      const previousAttribue = attributes[index];

      if (getIsDirty(previousAttribue, attribute)) {
        const name = attribute.name;
        const unit = attribute?.unit !== null ? attribute.unit : 'px';
        const value = attribute?.value !== null ? attribute.value : 0;

        setAttributes([
          ...attributes.slice(0, index),
          { name, value, unit },
          ...attributes.slice(index + 1),
        ]);
      }

      setSelectedAttribute(null);
    },
    [attributes, setAttributes],
  );

  const handleEnterOrEscape = useCallback(
    ({ keyCode }: { keyCode: number }) => {
      if ((keyCode === 13 || keyCode === 27) && selectedAttribute) {
        updateAttributes(selectedAttribute);
      }
    },
    [selectedAttribute, updateAttributes],
  );

  useEffect(() => {
    if (borderBoxAttributes) {
      setAttributes(borderBoxAttributes);
    }
  }, [borderBoxAttributes, setAttributes]);

  useEffect(() => {
    window.addEventListener('keydown', handleEnterOrEscape);

    return () => window.removeEventListener('keydown', handleEnterOrEscape);
  }, [selectedAttribute, handleEnterOrEscape]);

  return (
    <div
      className="prism-container"
      onClick={() => {
        selectedAttribute && updateAttributes(selectedAttribute);
      }}>
      <div className="prism-ct" />

      {attributes.map((attribute, index) => {
        const isSelected = selectedAttribute?.name === attribute.name;
        const originalAttributeState = defaultBorderBoxAttributes[index];

        return (
          <div
            className={`prism-${attribute?.name}`}
            key={attribute?.name + index}>
            <div
              onClick={(e) => {
                e.stopPropagation();

                if (selectedAttribute?.name !== attribute.name) {
                  if (selectedAttribute) {
                    updateAttributes(selectedAttribute);
                  }
                  setSelectedAttribute(attribute);
                }
              }}
              className={`${
                isSelected ? 'prism-attribute-container-selected' : ''
              } ${
                !isSelected && getIsDirty(originalAttributeState, attribute)
                  ? 'prism-attribute-container-is-dirty'
                  : 'prism-attribute-container-unselected'
              }`}>
              {isSelected ? (
                <PrismForm
                  {...{
                    selectedAttribute,
                    setSelectedAttribute,
                    index,
                  }}
                />
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
