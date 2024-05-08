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
      const holidayDate = [
        "01/01/2567",
        "02/01/2567",
        "26/02/2567",
        "08/04/2567",
        "15/04/2567",
        "16/04/2567",
        "17/04/2567",
        "01/05/2567",
        "06/05/2567",
        "22/05/2567",
        "06/06/2567",
        "22/07/2567",
        "23/07/2567",
        "29/07/2567",
        "12/08/2567",
        "14/10/2567",
        "23/10/2567",
        "05/12/2567",
        "10/12/2567",
        "31/12/2567",
      ];
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
          <Text style={styles.monthTitle}>January</Text>
          <View style={styles.calendar}>{generateMonth(0, 31)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>February</Text>
          <View style={styles.calendar}>{generateMonth(1, 28)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>March</Text>
          <View style={styles.calendar}>{generateMonth(2, 31)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>April</Text>
          <View style={styles.calendar}>{generateMonth(3, 30)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>May</Text>
          <View style={styles.calendar}>{generateMonth(4, 31)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>June</Text>
          <View style={styles.calendar}>{generateMonth(5, 30)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>July</Text>
          <View style={styles.calendar}>{generateMonth(6, 31)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>August</Text>
          <View style={styles.calendar}>{generateMonth(7, 31)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>September</Text>
          <View style={styles.calendar}>{generateMonth(8, 30)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>October</Text>
          <View style={styles.calendar}>{generateMonth(9, 31)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>November</Text>
          <View style={styles.calendar}>{generateMonth(10, 30)}</View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.monthTitle}>December</Text>
          <View style={styles.calendar}>{generateMonth(11, 31)}</View>
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
