<template>
    <Page class="page">
        <ScrollView>
            <StackLayout>
                <Label text="Turn on location sharing & see who's close by!" />
                <Switch check="false" @checkedChange="enableLocationServices"
                    @tap="onButtonTap(currentGeoLocation.latitude, currentGeoLocation.longitude)" />
                <StackLayout :visibility="currentGeoLocation.latitude ? 'visible' : 'collapsed'">
                    <!-- <Label :text="'Latitude: ' + currentGeoLocation.latitude" />
                    <Label :text="'Longitude: ' + currentGeoLocation.longitude" />
                    <Label :text="'Altitude: ' + currentGeoLocation.altitude" />
                    <Label :text="'Direction: ' + currentGeoLocation.direction" /> -->
                    <ListView />
                        <Label v-for="user in users" :text="user.username + ' - ' + this.distance + ' miles away'" />
                    </ListView>
                </StackLayout>
            </StackLayout>
        </ScrollView> 
    </Page> 
</template>
            
<script>
    const geoLocation = require("nativescript-geolocation");
    let distance = 0;
    export default {
        methods: {
            onButtonTap(lat1, lon1) {
                var lat2 = 47.624456;
                var lon2 = -122.356755;
                if (lat1 == lat2 && lon1 == lon2) {
                return 0;
                } else {
                var radlat1 = (Math.PI * lat1) / 180;
                var radlat2 = (Math.PI * lat2) / 180;
                var theta = lon1 - lon2;
                var radtheta = (Math.PI * theta) / 180;
                var dist =
                Math.sin(radlat1) * Math.sin(radlat2) +
                Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                dist = 1;
                }
                dist = Math.acos(dist);
                dist = (dist * 180) / Math.PI;
                dist = dist * 60 * 1.1515;
                this.distance = dist;
                console.log(distance);
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
                },
            {
                desiredAccuracy: 3,
                updateDistance: 10,
                minimumUpdateTime: 1000 * 1
            }
            );
            }
            },

            data() {
                return {
                    users: [
                    {
                id: 1,
                username: "Tanner",
                password: "tanner",
                preferred_language: "JavaScript",
                latitude: 47.624456,
                longitude: -122.356755
                },
                {
                id: 2,
                username: "Jimbo",
                password: "jimbo",
                preferred_language: "Vue.js",
                latitude: 47.571455,
                longitude: -122.37937
                },
                {
                id: 2,
                username: "Johnno",
                password: "johnno",
                preferred_language: "C#",
                latitude: 47.636467,
                longitude: -122.316241
                }
            ],
                username: "Tanner",
                distance: this.distance,
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