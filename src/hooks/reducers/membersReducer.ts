import { createSlice } from "@reduxjs/toolkit";
export interface MembersState {
  MembersList: any;
}
const initialState: MembersState = {
  MembersList: null,
};

export const membersSlice = createSlice({
  name: "Members",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      console.log("setMembers", action);
      state.MembersList = action.payload;
    },
    resetMembers: (state) => {
      console.log("resetMembers");
      state.MembersList = null;
    },
  },
});

export const { setMembers, resetMembers } = membersSlice.actions;

export default membersSlice.reducer;
