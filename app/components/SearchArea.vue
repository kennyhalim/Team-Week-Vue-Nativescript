<template>
    <Page class="page">
        <ScrollView>
            <StackLayout>
                <Label text="Turn on location sharing & see who's close by!" />
                <Switch @checkedChange="enableLocationServices" />
                <StackLayout :visibility="currentGeoLocation.latitude ? 'visible' : 'collapsed'">


                    <ListView class="list-group" v-for="user in users" v-bind:key="user" style="height:1250px">
                        <v-template>
                            <FlexboxLayout flexDirection="row" class="list-group-item">
                                <Image :src="user.imageSrc" class="thumb img-circle" />
                                <Label :text="user.username + ' - ' + getDistanceAway(currentGeoLocation.latitude, currentGeoLocation.longitude, user.latitude, user.longitude) + ' miles away.      ' + user.preferred_language"
                                    class="list-group-item-heading" style="width: 80%" />
                            </FlexboxLayout>
                        </v-template>
                    </ListView>




                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    const geoLocation = require("nativescript-geolocation");
    export default {
        methods: {
            getDistanceAway(lat1, lon1, lat2, lon2) {
                if (lat1 == lat2 && lon1 == lon2) {
                    return 0;
                } else {
                    var radlat1 = (Math.PI * lat1) / 180;
                    var radlat2 = (Math.PI * lat2) / 180;
                    var theta = lon1 - lon2;
                    var radtheta = (Math.PI * theta) / 180;
                    var dist =
                        Math.sin(radlat1) * Math.sin(radlat2) +
                        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(
                            radtheta);
                    if (dist > 1) {
                        dist = 1;
                    }
                    dist = Math.acos(dist);
                    dist = (dist * 180) / Math.PI;
                    dist = dist * 60 * 1.1515;
                    return dist.toFixed(2);
                }
            },
            enableLocationServices: function() {
                geoLocation.isEnabled().then(enabled => {
                    if (!enabled) {
                        geoLocation
                            .enableLocationRequest()
                            .then(() => this.showLocation());
                    } else {
                        this.showLocation();
                    }
                });
            },
            showLocation: function() {
                geoLocation.watchLocation(
                    location => {
                        this.currentGeoLocation = location;
                    },
                    error => {
                        alert(error);
                    }, {
                        desiredAccuracy: 3,
                        updateDistance: 10,
                        minimumUpdateTime: 1000 * 1
                    }
                );
            }
        },

        data() {
            return {
                users: [{
                        id: 1,
                        username: "Tanner",
                        password: "tanner",
                        preferred_language: "JavaScript",
                        latitude: 47.624456,
                        longitude: -122.356755,
                        imageSrc: "https://www.shareicon.net/data/128x128/2016/09/01/822711_user_512x512.png"
                    },
                    {
                        id: 2,
                        username: "Jimbo",
                        password: "jimbo",
                        preferred_language: "Vue.js",
                        latitude: 47.571455,
                        longitude: -122.37937,
                        imageSrc: "https://www.shareicon.net/data/128x128/2016/09/01/822720_user_512x512.png"
                    },
                    {
                        id: 3,
                        username: "Johnno",
                        password: "johnno",
                        preferred_language: "C#",
                        latitude: 47.636467,
                        longitude: -122.316241,
                        imageSrc: "https://www.shareicon.net/data/128x128/2016/09/01/822745_user_512x512.png"
                    }
                ],
                currentGeoLocation: {
                    latitude: null,
                    longitude: null,
                    altitude: null,
                    direction: null
                }
            };
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>