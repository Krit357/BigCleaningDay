import PageLayout from "./PageLayout";
import Header from "../code/Header";
import { PDFViewer } from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import employeelist from "../../../employeelist";

const styles = StyleSheet.create({
  page: {
    padding: "10px",
    overflow: "none",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  monthTitle: {
    paddingVertical: "20px",
    borderRadius: "5px",
    fontSize: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "rgb(226 232 240)",
  },
  day: {
    textAlign: "center",
  },
  calendar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  dateContainer: {
    backgroundColor: "rgb(226 232 240)",
    height: "100px",
    borderRadius: "5%",
    margin: "3px",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    height: "90px",
    gap: "10px",
    width: "100px",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "3px",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  dayOfWeek: {
    backgroundColor: "rgb(203 213 225)",
    width: "100%",
    height: "35px",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
    flexDirection: "column",
    justifyContent: "center",
  },
  holidayHeader: {
    backgroundColor: "rgb(239 68 68)",
    width: "100%",
    height: "35px",
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
    flexDirection: "column",
    justifyContent: "center",
  },
  holiday: {
    backgroundColor: "rgb(252 165 165)",
    borderRadius: "5%",
    margin: "3px",
  },
  formattedDate: {
    fontSize: "10px",
  },
});

const shuffleArray = (array) => {
  return array;
};

const EmployeeDate = ({ dayOfWeek, formattedDate, isHoliday, name }) => {
  const containerStyle = isHoliday ? styles.holiday : styles.dateContainer;
  const headerStyle = isHoliday ? styles.holidayHeader : styles.dayOfWeek;
  return (
    <View style={containerStyle}>
      <View style={styles.date}>
        <View style={headerStyle}>
          <Text>{dayOfWeek}</Text>
        </View>
        <Text>{formattedDate}</Text>
        {isHoliday ? (
          <View>
            <Text>Holiday</Text>
          </View>
        ) : (
          <View style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>{name}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const DailyCleaning = () => {
  const employeeMap = employeelist.map((ppl) => ppl.name);
  const shuffledEmployeeMap = shuffleArray(employeeMap);

  let currentIndex = 0;
  const getNextName = () => {
    const nextName = shuffledEmployeeMap[currentIndex];
    currentIndex = (currentIndex + 1) % shuffledEmployeeMap.length; // Move to the next index (looping back if needed)
    return nextName;
  };

  const generateMonth = (month, days) => {
    return Array.from({ length: days }, (_, i) => {
      const currentDate = new Date(2024, month, i + 1);
      const dayOfWeek = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const formattedDate = currentDate.toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      if (dayOfWeek === "Saturday" || dayOfWeek === "Sunday") {
        return null;
      }

      const isWeekend = dayOfWeek === "Saturday" || dayOfWeek === "Sunday";

      // ----------------- ใส่วันหยุด -----------------//

      const holidayDate = [
        "01/01/2568",
        "12/02/2568",
        "07/04/2568",
        "14/04/2568",
        "15/04/2568",
        "16/04/2568",
      ];

      // -------------------------------------------//
      const isHoliday = holidayDate.includes(formattedDate);

      return (
        <EmployeeDate
          key={i + 1}
          dayOfWeek={dayOfWeek}
          formattedDate={formattedDate}
          isHoliday={isHoliday || isWeekend}
          name={isHoliday || isWeekend ? null : getNextName()}
        />
      );
    });
  };

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>December</Text>
          <View style={styles.calendar}>{generateMonth(11, 31)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>January</Text>
          <View style={styles.calendar}>{generateMonth(12, 31)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>February</Text>
          <View style={styles.calendar}>{generateMonth(13, 28)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>March</Text>
          <View style={styles.calendar}>{generateMonth(14, 31)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>April</Text>
          <View style={styles.calendar}>{generateMonth(15, 30)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>May</Text>
          <View style={styles.calendar}>{generateMonth(16, 31)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>June</Text>
          <View style={styles.calendar}>{generateMonth(17, 30)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>July</Text>
          <View style={styles.calendar}>{generateMonth(18, 31)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>August</Text>
          <View style={styles.calendar}>{generateMonth(19, 31)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>September</Text>
          <View style={styles.calendar}>{generateMonth(20, 30)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>October</Text>
          <View style={styles.calendar}>{generateMonth(21, 31)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>November</Text>
          <View style={styles.calendar}>{generateMonth(22, 30)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>December</Text>
          <View style={styles.calendar}>{generateMonth(23, 31)}</View>
        </View>
      </Page>
    </Document>
  );

  return (
    <PageLayout style={{ width: "100%", height: "600px" }}>
      <Header>Daily Cleaning</Header>
      <PDFViewer style={{ width: "100%", height: "calc(100% - 50px)" }}>
        <MyDocument />
      </PDFViewer>
    </PageLayout>
  );
};

export default DailyCleaning;
