import React, { createContext, useReducer } from "react";
import axios from "axios";

const initialState = {
    loading: true,
    loaded: false,
    doctorsId: null,
    nursesId: null,
    patientId: null,
    drugs: null,
    isPaid: false,
    paymentResult: false,
    paidAt: null,
    delivered: false,
    deliveredAt: null,
    checked: false
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
        case "ADD_DOCTOR_SUCCESSFUL":
            return {
                ...initialState,
                loading: false,
                loaded: true,
                doctorsId: payload.doctorsId,
            };
        case "ADD_NURSE_SUCCESSFUL":
            return {
                ...initialState,
                loading: false,
                loaded: true,
                nursesId: payload.nursesId,
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
    dispatch({
        type: "REQUEST_DRUGS"
    });
    dispatch({
            type: "GET_DRUGS_SUCCESSFUL",
            payload: {
                drugs: []
            }
        });
    // await axios.get("api")
    //     .then(res => {
    //         dispatch({
    //             type: "GET_DRUGS_SUCCESSFUL",
    //             payload: {
    //                 users: res.data.drugs
    //             }
    //         })
    //     })
    //     .catch(err => {
    //         dispatch({
    //             type: "GET_DRUGS_FAILURE"
    //         });
    //         console.log(`Error getting drugs: err`)
    //     })
};

export const addDoctor = async (dispatch, user) => {
    dispatch({
        type: "REQUEST_DRUGS"
    });
    await axios.post("api", user)
        .then(res => {
            dispatch({
                type: "ADD_DOCTOR_SUCCESSFUL",
                payload: {
                    doctorsId: res.data.doctors
                }
            })
        })
        .catch(err => {
            dispatch({
                type: "GET_DRUGS_FAILURE"
            });
            console.log(`Error adding drugs: err`)
        })
};
export const addPatient = async (dispatch, user) => {
    dispatch({
        type: "REQUEST_DRUGS"
    });
    await axios.post("api", user)
        .then(res => {
            dispatch({
                type: "ADD_PATIENT_SUCCESSFUL",
                payload: {
                    patientId: res.data.patient
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
export const addNurse = async (dispatch, user) => {
    dispatch({
        type: "REQUEST_DRUGS"
    });
    await axios.post("api", user)
        .then(res => {
            dispatch({
                type: "ADD_NURSE_SUCCESSFUL",
                payload: {
                    nursesId: res.data.nurse
                }
            })
        })
        .catch(err => {
            dispatch({
                type: "GET_DRUGS_FAILURE"
            });
            console.log(`Error adding nurse: err`)
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
export const removeDrug = async (dispatch, userDrug) => {
    dispatch({
        type: "REQUEST_DRUGS"
    });
    await axios.post("api", userDrug)
        .then(res => {
            dispatch({
                type: "REMOVE_DRUG_SUCCESSFUL",
                payload: {
                    drugs: res.data.drug.filter((dr) => dr.prescription !== userDrug.prescription)
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
    const [state, dispatch] = useReducer(reducers, initialState);

    return (
        <DrugsDispatchContext.Provider value={dispatch}>
            <DrugsStateContext.Provider value={state}>
                {children}
            </DrugsStateContext.Provider>
        </DrugsDispatchContext.Provider>
    );
};
export default DrugsProvider;
