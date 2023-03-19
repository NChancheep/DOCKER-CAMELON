import { createSlice, } from "@reduxjs/toolkit";
import { news } from './data/news'
import { locations } from './data/locations'
import { news_info } from './data/news_info'
import { provinces } from "./data/provinces";
import { districts } from "./data/districts";
import { subdistricts } from "./data/subdistricts";
import { thailandGeoJson } from "./data/thailand";
const initialState = {
    news: news,
    news_info: news_info,
    locations: locations,
    provinces: provinces,
    districts: districts,
    subdistricts: subdistricts,
    user_current_location: {latitude : 13.751 , longitude : 100.492},
    thailandGeoJson: thailandGeoJson
}

const camelonSlice = createSlice({
    name: "newsLocationList",
    initialState,
    reducers: {
        change_current_location: (state, action) => {
            state.user_current_location = action.payload;
        }

    }
})

export const { change_current_location } = camelonSlice.actions
export default camelonSlice.reducer

