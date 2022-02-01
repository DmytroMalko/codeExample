import React, { useEffect, useState } from "react";
import Button from "./UI/button";
import Input from "./UI/input";
import style from "./SearchBar.module.scss";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import Head from "next/head";

const buttonsData = [
  {
    name: "Campervan",
    text: "Obytka s rozměry osobáku, se ktreou dojedete všude.",
    type: "Campervan",
  },
  {
    name: "Integrál",
    text: "Král mezi akravany. Luxus na kolech.",
    type: "Intergrated",
  },

  {
    name: "Vestavba",
    text: "Celý byt geniálně poskládaný do dodávky.",
    type: "BuiltIn",
  },
  {
    name: "Přívěs",
    text: "Tažný karavan za vaše auto. Od kapkovitých až po rodinné.",
    type: "Alcove",
  },
];

export type FilteredData = {
  rangeFrom: number | null;
  rangeTo: number | null;
  type: string[] | null;
  reservation: boolean | null;
};

type Props = {
  onFilter: (data: FilteredData) => void;
};

const startMinPrice = 3000;
const startMaxPrice = 6000;

export default function SearchBar({ onFilter }: Props) {
  const [type, setType] = useState<string[] | null>(null);
  const [rangeFrom, setRangeFrom] = useState<number | null>(null);
  const [rangeTo, setRangeTo] = useState<number | null>(null);
  const [reservation, setReservation] = useState<boolean | null>(null);

  const handleTypes = (cavType: string) => {
    if (type !== null) {
      const hasType = type.find((singType) => singType === cavType);
      if (hasType) {
        const allTypes = type.filter((singType) => singType !== cavType);
        setType(allTypes);
      } else {
        setType((oldArray) => [...oldArray!, cavType]);
      }
    } else {
      setType([cavType]);
    }
  };

  useEffect(() => {
    if (
      type !== null ||
      rangeFrom !== null ||
      rangeTo !== null ||
      reservation !== null
    ) {
      const data = {
        rangeFrom: rangeFrom,
        rangeTo: rangeTo,
        type: type,
        reservation: reservation,
      };

      onFilter(data);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, rangeFrom, rangeTo, reservation]);

  const rangeInputValue = () => {
    return rangeFrom
      ? rangeTo
        ? [rangeFrom, rangeTo]
        : [3000, rangeTo]
      : [rangeFrom, 6000];
  };

  return (
    <div>
      <Head>
        <title>Vans</title>
        <meta name="author" content="Dmytro Malko" />
        <meta name="keywords" content="vans, rent-van" />
        <meta name="description" content="Aplikace s vanama" />
      </Head>
      <form className={style.form}>
        <div className={style.inputContainer}>
          Cena za den
          <Range
            defaultValue={[3000, 6000]}
            onChange={(e) => {
              setRangeFrom(e[0]);
              setRangeTo(e[1]);
            }}
            min={0}
            max={10000}
            value={rangeInputValue()}
          />
          <div className={style.inputBox}>
            <Input
              onChange={(e) => setRangeFrom(parseInt(e, 10))}
              value={rangeFrom && rangeFrom.toString()}
              type="number"
              defaultValue={startMinPrice}
            />
            <Input
              onChange={(e) => setRangeTo(parseInt(e, 10))}
              type="number"
              value={rangeTo && rangeTo.toString()}
              defaultValue={startMaxPrice}
            />
          </div>
        </div>

        <div>
          Typ karavanu
          <div className={style.buttonBox}>
            {buttonsData.map((data, index) => (
              <Button
                className={`${style.button} ${
                  type?.includes(data.type) && style.btnActive
                }`}
                state="default"
                onClick={() => handleTypes(data.type)}
                key={index}
              >
                <div className={style.buttonTitle}>{data.name}</div>
                <div>{data.text}</div>
              </Button>
            ))}
          </div>
        </div>

        <div className={style.selectBox}>
          <div>Okamžitá rezervace</div>
          <select
            defaultValue={"1"}
            onChange={(e) => {
              setReservation(Boolean(parseInt(e.target.value, 10)));
            }}
            className={style.select}
          >
            <option value={"1"}>Ano</option>
            <option value={"0"}>Ne</option>
          </select>
        </div>
      </form>
    </div>
  );
}
