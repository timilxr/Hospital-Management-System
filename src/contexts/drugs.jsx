import React, { createContext, useReducer, useState, useEffect } from "react";
import axios from "axios";

const initialState = {
    loading: false,
    loaded: false,
    drugs: null,
    drug: null,
};

export const DrugsDispatchContext = createContext();
export const DrugsStateContext = createContext();

const reducers = (initialState, { type, payload }) => {
    switch (type) {
        case "REQUEST_DRUGS":
            return {
                ...initialState,
                loading: true,
            };
        case "GET_DRUGS_SUCCESSFUL":
            return {
                ...initialState,
                loading: false,
                loaded: true,
                drugs: payload.drugs,
            };
        case "GET_DRUG_SUCCESSFUL":
            return {
                ...initialState,
                loading: false,
                loaded: true,
                drug: payload.drug,
            };
        case "UPDATE_DRUG_SUCCESSFUL":
            return {
                ...initialState,
                loading: false,
                loaded: true,
                // drugs: payload.drugs,
                drug: payload.drug,
            };
        case "ADD_DRUG_SUCCESSFUL":
            return {
                ...initialState,
                loading: false,
                loaded: true,
                drug: payload.drug,
            };
        case "ADD_PATIENT_SUCCESSFUL":
            return {
                ...initialState,
                loading: false,
                loaded: true,
                patientId: payload.patientId,
            };
        case "UPDATE_FEE_SUCCESSFUL":
            return {
                ...initialState,
                loading: false,
                loaded: true,
                checked: true,
                drugs: payload.drugs
            };
        case "UPDATE_PAYMENT_SUCCESSFUL":
            return {
                ...initialState,
                loading: false,
                loaded: true,
                isPaid: payload.isPaid,
                paymentResult: payload.paymentResult,
                paidAt: new Date()
            };
        case "UPDATE_DELIVERY_SUCCESSFUL":
            return {
                ...initialState,
                loading: false,
                loaded: true,
                delivered: true,
                deliveredAt: new Date()
            };
        case "REMOVE_DRUG_SUCCESSFUL":
            return {
                ...initialState,
                loading: false,
                loaded: true,
                drugs: payload.drugs,
            };
        case "GET_DRUGS_FAILURE":
            return {
                ...initialState,
                loading: false,
                loaded: true,
                drugs: null
            };
        default:
            throw new Error(`Unknown action type: ${type}`);
    }
};

export const getDrugs = async (dispatch) => {
    // dispatch({
    //     type: "REQUEST_DRUGS"
    // });
    await axios.get('http://localhost:5000/prescriptions')
        .then(res => {
            dispatch({
                type: "GET_DRUGS_SUCCESSFUL",
                payload: {
                    drugs: res.data
                }
            })
        })
        .catch(err => {
            dispatch({
                type: "GET_DRUGS_FAILURE"
            });
            console.log(`Error getting drugs: ${err}`)
        })
};
export const getDrug = async (dispatch, drugId) => {
    // dispatch({
    //     type: "REQUEST_DRUGS"
    // });
    // await dispatch({
    //         type: "GET_DRUGS_SUCCESSFUL",
    //         payload: {
    //             drugs: []
    //         }
    //     });
    await axios.get(`http://localhost:5000/prescriptions/${drugId}`)
        .then(res => {
            dispatch({
                type: "GET_DRUG_SUCCESSFUL",
                payload: {
                    drug: res.data
                }
            })
        })
        .catch(err => {
            dispatch({
                type: "GET_DRUGS_FAILURE"
            });
            console.log(`Error getting drug: ${err}`)
        })
};

// export const addDoctor = async (dispatch, user) => {
//     dispatch({
//         type: "REQUEST_DRUGS"
//     });
//     await axios.post("api", user)
//         .then(res => {
//             dispatch({
//                 type: "ADD_DOCTOR_SUCCESSFUL",
//                 payload: {
//                     doctorsId: res.data.doctors
//                 }
//             })
//         })
//         .catch(err => {
//             dispatch({
//                 type: "GET_DRUGS_FAILURE"
//             });
//             console.log(`Error adding drugs: err`)
//         })
// };
export const updateDrug = async (dispatch, drugId, drug) => {
    // dispatch({
    //     type: "REQUEST_DRUGS"
    // });
    await axios.put(`http://localhost:5000/prescriptions/${drugId}`, drug)
        .then(res => {
            dispatch({
                type: "UPDATE_DRUG_SUCCESSFUL",
                payload: {
                    // drugs: res.data.all,
                    drug: res.data.one
                }
            })
        })
        .catch(err => {
            dispatch({
                type: "GET_DRUGS_FAILURE"
            });
            console.log(`Error adding patient: err`)
        })
};
export const addDrug = async (dispatch, drug) => {
    dispatch({
        type: "REQUEST_DRUGS"
    });
    console.log(drug, 'me');
    await axios.post("http://localhost:5000/prescriptions/", drug)
        .then(res => {
            dispatch({
                type: "ADD_DRUG_SUCCESSFUL",
                payload: {
                    drug: res.data
                }
            })
        })
        .catch(err => {
            dispatch({
                type: "GET_DRUGS_FAILURE"
            });
            console.log(`Error adding drug: ${err}`)
        })
};
export const updateFee = async (dispatch, drugs) => {
    dispatch({
        type: "REQUEST_DRUGS"
    });
    await axios.post("api", drugs)
        .then(res => {
            dispatch({
                type: "UPDATE_FEE_SUCCESSFUL",
                payload: {
                    drugs
                }
            })
        })
        .catch(err => {
            dispatch({
                type: "GET_DRUGS_FAILURE"
            });
            console.log(`Error updating fee: err`)
        })
};
export const requestConsult = async (dispatch, userId, drug, user) => {
    // dispatch({
    //     type: "REQUEST_USERS"
    // });
        await axios.get(`http://localhost:5000/prescriptions/`)
    .then(res=>{
      console.log(res.data);
      const id = res.data.one._id;
      axios.put(`http://localhost:5000/users/${userId}`, {...user, folder: id})
      .then(res=>{
          dispatch({
              type: "UPDATE_USER_SUCCESSFUL",
              payload: {
                  user: res.data.one,
                  users: res.data.all
              }
          })
      })
      .catch(err=>{
          dispatch({
              type: "GET_DRUGS_FAILURE"
          });
          console.log(`Error updating user: ${err}`)
      })
    })
    .catch(err=>{
        dispatch({
            type: "GET_DRUGS_FAILURE"
        });
        console.log(`Error requesting consult: ${err}`)
    })
};
export const updatePayment = async (dispatch, data) => {
    dispatch({
        type: "REQUEST_DRUGS"
    });
    await axios.post("api", data)
        .then(() => {
            dispatch({
                type: "UPDATE_PAYMENT_SUCCESSFUL",
                payload: {
                    ...data
                }
            })
        })
        .catch(err => {
            dispatch({
                type: "GET_DRUGS_FAILURE"
            });
            console.log(`Error updating payment: ${err}`)
        })
};
export const updateDelivery = async (dispatch) => {
    dispatch({
        type: "REQUEST_DRUGS"
    });
    await axios.post("api")
        .then(() => {
            dispatch({
                type: "UPDATE_PAYMENT_SUCCESSFUL"
            })
        })
        .catch(err => {
            dispatch({
                type: "GET_DRUGS_FAILURE"
            });
            console.log(`Error updating delivery: ${err}`)
        })
};
export const removeDrug = async (dispatch, drugId) => {
    dispatch({
        type: "REQUEST_DRUGS"
    });
    await axios.delete(`https://hospitalms-backend.herokuapp.com/prescriptions/${drugId}`)
        .then(res => {
            dispatch({
                type: "REMOVE_DRUG_SUCCESSFUL",
                payload: {
                    drugs: res.data
                    // drugs: res.data.drug.filter((dr) => dr.prescription !== userDrug.prescription)
                }
            })
        })
        .catch(err => {
            dispatch({
                type: "GET_DRUGS_FAILURE"
            });
            console.log(`Error removing drug: err`)
        })
};

const DrugsProvider = ({ children }) => {
    const [drugs, setDrugs] = useState(initialState);
    const [state, dispatch] = useReducer(reducers, initialState);
  
  useEffect(()=>{
    axios.get("http://localhost:5000/prescriptions")
    .then(res=>{
      dispatch({
          type: 'GET_DRUGS_SUCCESSFUL',
          payload:{
              drugs: res.data
          }
      })
    })
    .catch(err=>{
    //   setDrugs({
    //     loading: false,
    //     loaded: false,
    //     drugs: null,
    //     drug: null
    //   });
      console.log(`Error getting drugs: ${err}`)
    })
  }, [])

    return (
        <DrugsDispatchContext.Provider value={dispatch}>
            <DrugsStateContext.Provider value={state}>
                {children}
            </DrugsStateContext.Provider>
        </DrugsDispatchContext.Provider>
    );
};
export default DrugsProvider;
