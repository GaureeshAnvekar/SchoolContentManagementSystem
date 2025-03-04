import axios from "axios";
import setAuthToken from "./utils/setAuthToken";

export const scheduleLectureAPI = async (scheduleData = null) => {
  const endPoint = "https://easyschool.academy/api/onlineLecture/scheduleLecture";

  setAuthToken(localStorage.employeetoken);

  try {
    const body = JSON.stringify(scheduleData);

    const res = await axios.post(endPoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return 1;
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};

export const getAllScheduledLecturesAPI = async () => {
  //const endPoint = "http://joseph.easyschool.com:5000/api/onlineLecture/getAllScheduledLectures";
    const endPoint = "https://easyschool.academy/api/onlineLecture/getAllScheduledLectures";

  setAuthToken(localStorage.employeetoken);

  try {
    const res = await axios.get(endPoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};

export const cancelScheduledLectureAPI = async (scheduleToRemove) => {
  const endPoint =
    "https://easyschool.academy/api/onlineLecture/cancelScheduledLecture";

  setAuthToken(localStorage.employeetoken);

  try {
    const body = JSON.stringify(scheduleToRemove);

    const res = await axios.post(endPoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return 1;
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};

export const getStudentsLecturesAPI = async (requestBody = null) => {
  //const endPoint = "https://joseph.easyschool.com:5000/api/onlineLecture/getStudentsLectures";
   const endPoint = "https://easyschool.academy/api/onlineLecture/getStudentsLectures";

  setAuthToken(localStorage.studenttoken);

  try {
    const body = JSON.stringify(requestBody);
    const res = await axios.post(endPoint, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: 1, data: res.data };
  } catch (err) {
    const errors = err.response.data.errors;

    throw (new Error().errors = errors);
  }
};
