import React from "react";
import style from "./vanCard.module.scss";
import Image from "next/image";
import MyImage from "./UI/myImage";
import { VanData } from "../models/Vans";

type Props = {
  data: VanData;
};

export default function VanCard({ data }: Props) {
  return (
    <div className={style.container}>
      <div>
        <MyImage
          className={style.vanImage}
          alt={`van-${data.name}`}
          src={data.pictures[0]}
        />
      </div>
      <div className={style.vanDataContainer}>
        <div className={style.vanNameBox}>
          <div className={style.vanType}>{data.vehicleType}</div>
          <div className={style.vanName}>{data.name}</div>
        </div>

        <div className={style.vanInfo}>
          <div>{data.location}</div>
          <div className={style.vanEquip}>
            <div className={style.vanIconBox}>
              <Image alt="icon" height={"20px"} width={"20px"} src="/van.png" />
              <div>{data.passengersCapacity}</div>
            </div>
            <div className={style.vanIconBox}>
              <Image alt="icon" height={"20px"} width={"20px"} src="/van.png" />
              <div>{data.sleepCapacity}</div>
            </div>
            {data.toilet && (
              <div className={style.vanIconBox}>
                <Image
                  alt="icon"
                  height={"20px"}
                  width={"20px"}
                  src="/toilet.png"
                />
              </div>
            )}
            {data.shower && (
              <div className={style.vanIconBox}>
                <Image
                  alt="icon"
                  height={"20px"}
                  width={"20px"}
                  src="/shower.png"
                />
              </div>
            )}
          </div>
        </div>

        <div className={style.priceBox}>
          <div>Cena od</div>
          <div>{data.price}Kč/den</div>
        </div>
      </div>
    </div>
  );
}
