import React, { useState, useEffect } from "react";
import { Col, Card, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { change_selected_months } from "../store/Reducer";
import { change_selected_year } from "../store/Reducer";

function TimeSelecter() {
  const { selectedMonths } = useSelector((state) => state.data);
  const { selectedYear } = useSelector((state) => state.data);
  const [isSelectedAll, setIsSelectAll] = useState(true);

  const { news } = useSelector((state) => state.data);
  function count(year, month) {
    // console.log(year);
    let count = 0;
    for (let i = 0; i < news.length; i++) {
      if (year !== "") {
        if (
          news[i].publish_date.split("-")[0] === year &&
          news[i].publish_date.split("-")[1] === month
        ) {
          // console.log(news[i].publish_date)
          // console.log("ปีที่เลือก"+year)
          // console.log("เดือนที่เลือก"+(month))
          count++;
        }
      } else {
        if (news[i].publish_date.split("-")[1] === month) {
          count++;
        }
      }
    }
    return count;
  }

  useEffect(() => {
    if (isSelectedAll) {
      let newMonths = [...selectedMonths];
      newMonths.forEach((month, index) => {
        newMonths[index] = { ...month, isSelected: true };
      });
      dispatch(change_selected_months(newMonths));
    } else {
      let newMonths = [...selectedMonths];
      newMonths.forEach((month, index) => {
        newMonths[index] = { ...month, isSelected: false };
      });
      dispatch(change_selected_months(newMonths));
    }
  }, [isSelectedAll]);

  const dispatch = useDispatch();

  function handleMonthClick(clickedMonth) {
    let newMonths = [...selectedMonths];
    // console.log(newMonths)
    newMonths.forEach((month, index) => {
      if (month.name === clickedMonth.name) {
        newMonths[index] = { ...month, isSelected: !month.isSelected };
      }
    });
    dispatch(change_selected_months(newMonths));
  }

  function handleCheckBox() {
    let newMonths = [...selectedMonths];
    newMonths.forEach((month, index) => {
      if (month.isSelected === true) {
        newMonths.forEach((month, index) => {
          newMonths[index] = { ...month, isSelected: false };
        });
      } else {
        newMonths.forEach((month, index) => {
          newMonths[index] = { ...month, isSelected: true };
        });
      }
    });
    dispatch(change_selected_months(newMonths));
  }

  return (
    <Card style={{ marginTop: "2%", fontFamily: "Kanit" }}>
      <Row xs>
        <Col sm style={{ marginTop: "1%", marginLeft: "1%" }}>
          กรุณาเลือกปีที่ต้องการจะทราบข้อมูล:
          <select
            value={selectedYear}
            onChange={(e) => dispatch(change_selected_year(e.target.value))}
          >
            <option disabled>เลือกปี</option>
            <option value="" selected>
              เลือกทุกปี
            </option>
            <option value="2018">2018</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
        </Col>

        <Col sm={6} style={{ marginTop: "1%" }}>
          *สามารถเลือกเดือนที่ต้องการจะทราบว่ามีเหตุการณ์ใดเกินขึ้นได้บางจากการกดที่เดือนที่ต้องการ
        </Col>
      </Row>
      <Row xs style={{ padding: 10 }}>
        {selectedMonths.map((month) => (
          <Col sm key={month.number}>
            {month.isSelected ? (
              <button
                style={{ width: "100%", marginBottom: "10%" }}
                className=""
                type="submit"
                onClick={() => handleMonthClick(month)}
              >
                <Card style={{ padding: "10%", backgroundColor: "#E7FCDC7C" }}>
                  <text style={{ color: "#479B5F", fontWeight: "bold" }}>
                    {month.name}
                  </text>
                  <text>{count(selectedYear, month.number)}</text>
                  <text>เหตุการณ์</text>
                </Card>
              </button>
            ) : (
              <button
                style={{ width: "100%" }}
                className="bg-white text-black hover:bg-black hover:text-white"
                type="submit"
                onClick={() => handleMonthClick(month)}
              >
                <Card style={{ padding: "10%" }} className="">
                  <text style={{ color: "#000000", fontWeight: "bold" }}>
                    {month.name}
                  </text>
                  <text>{count(selectedYear, month.number)}</text>
                  <text>เหตุการณ์</text>
                </Card>
              </button>
            )}
          </Col>
        ))}
      </Row>
      <Row>
        <Col sm style={{ marginLeft: "1%" }} >
          <input
            className="mr-2"
            type="checkbox"
            checked={isSelectedAll}
            onClick={() => setIsSelectAll(!isSelectedAll)}
          ></input>
          คลิกเพื่อเลือกหรือไม่เลือกทั้งหมด
        </Col>
      </Row>
    </Card>
  );
}

export default TimeSelecter;
