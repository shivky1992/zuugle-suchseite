import React from "react";
// import { useEffect } from "react";
import ItineraryCalendar from "./ItineraryCalendar";
import ItineraryTourTimeLineContainer from "../TimeLine/ItineraryTourTimeLineContainer";
import { useTranslation } from "react-i18next";
import { Divider, Typography } from "@mui/material";

const Itinerary = ({ connectionData, dateIndex, updateConnIndex, tour, validTour, city, idOne }) => {

  const { t } = useTranslation();

  const tourDuration = !!tour && !!tour.duration ? tour.duration : undefined;
  
  return (
    <div className="tour-detail-itinerary-container">
      <div className="tour-detail-itinerary">
        <p className="tour-detail-itinerary-header">
          {t("Details.oeffi_fahrplan")}
        </p>
        {
          !!validTour ? (
            <>
              <ItineraryCalendar
              connectionData={connectionData}
              dateIndex={dateIndex}
              updateConnIndex={updateConnIndex}
              />
              <Divider sx={{ my: "24px" }} />
              {!!connectionData && (
                <ItineraryTourTimeLineContainer
                  connections={connectionData}
                  dateIndex={dateIndex}
                  loading={false}
                  duration={tourDuration}
                  tour={tour}
                  city={city}
                  idOne={idOne}
                />
              )}
            </>
          )
          :
          <Typography variant={"infoKey"}>
             {t('Details.oeffi_fahrplan_inactive_tour')}
          </Typography>
        }
      </div>
    </div>
  );
};

export default Itinerary;
