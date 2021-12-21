import EmployeeService from "../services/employee.service";

const employee = {
    namespaced: true,
    state: {
        data: {}
    },
    actions: {
        getEmployee({commit}) {
         return EmployeeService.getEmployee().then((response) => {
                commit('SET_EMPLOYEE', response.data);
                return Promise.resolve(response.data);
            })
        }
    },
    mutations: {
        SET_EMPLOYEE(state, data) {
            state.data.employee = data;
        }
    }
};

export default employee;