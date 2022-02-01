import { useEffect, useState } from "react";
import SearchBar, { FilteredData } from "../components/SearchBar";
import Button from "../components/UI/button";
import VanCard from "../components/vanCard";
import { VanData } from "../models/Vans";
import { Heading } from "../src/components/LayoutComponents";
import style from "./index.module.scss";

const Home = () => {
  const [vans, setVans] = useState<VanData[]>([]);
  const [filteredVans, setFilteredVans] = useState<VanData[]>([]);

  const [numberOfDisplays, setNumberOfDisplays] = useState(6);

  const displayVans = (vansData: VanData[], filteredData?: FilteredData) => {
    let finallVersion = vansData;

    if (filteredData) {
      // Price Filters
      if (filteredData?.rangeFrom && filteredData?.rangeTo) {
        finallVersion = finallVersion.filter(
          (allVans) =>
            allVans.price <= filteredData.rangeTo! &&
            allVans.price >= filteredData.rangeFrom!
        );
      }

      if (filteredData.type && filteredData.type.length > 0) {
        finallVersion = finallVersion.filter((validVans) =>
          filteredData.type!.includes(String(validVans.vehicleType))
        );
      }

      if (
        filteredData.reservation !== null &&
        filteredData.reservation !== undefined
      ) {
        finallVersion = finallVersion.filter(
          (validVans) => validVans.instantBookable === filteredData.reservation
        );
      }
    }

    return setFilteredVans(finallVersion);
  };

  useEffect(() => {
    if (vans.length < 1) {
      (async () => {
        await fetch("http://localhost:3000/api/data")
          .then((response) => response.json())
          .then((data) => setVans(data.items));
      })();
    }
  }, [vans]);

  return (
    <div>
      <Heading>Prague Labs testovací zadání</Heading>

      <div className={style.container}>
        <SearchBar onFilter={(data) => displayVans(vans, data)} />

        <div className={style.vansContainer}>
          {filteredVans.length > 1
            ? filteredVans.map((singleVan, index) => (
                <VanCard key={index} data={singleVan} />
              ))
            : vans
                .slice(0, numberOfDisplays)
                .map((singleVan, index) => (
                  <VanCard key={index} data={singleVan} />
                ))}
        </div>
      </div>
      <div className={style.btnContainer}>
        <Button
          state="primary"
          onClick={() => setNumberOfDisplays(numberOfDisplays + 6)}
        >
          Načíst další
        </Button>
      </div>
    </div>
  );
};

export default Home;
