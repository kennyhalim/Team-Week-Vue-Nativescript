<template>
    <Page class="Page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <StackLayout row="1">
            <Label text="BlaBla" textWrap="true" class="header"/>
            <Button text="Login" class="login" @tap="$navigateBack"/>
            <Button text="Signup" class="signup"/>
        </StackLayout>
    </Page>
</template>

<script>

    export default {
        data() {
            return {
              
            };
        }  
    }

</script>

<style scoped>
    Page {
        margin: 0;
        background-image: url('~/images/bg.jpg');
        background-repeat: no-repeat;
        height:100%;
    }
</style>


