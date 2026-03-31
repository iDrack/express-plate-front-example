<script lang="ts" setup>
</script>

<template>
    <div class="flex flex-col justify-center space-y-6 py-6">
        <div class="flex flex-col items-center">
            <h1 class="text-4xl font-bold pb-6">
                Express-plate
            </h1>
            <p class="">Ready to use node.js boiler plate using Typescript and TypeORM.</p>
        </div>
        <div class="flex flex-col items-center">
            <p class="px-4">
                This boiler plate currently implements user and role management, password reset, file transfert,
                unit testing and health check endpoints usable by Kubernates health probes. You can try out every
                features of the boilerplate on this website, start by <ULink to="/register">creating your account</ULink>.
            </p>
        </div>
        <div>
            <h2 class="text-2xl font-semibold pb-4">
                Download
            </h2>
            <p class="pl-4">
                You can download an archive in the release pages at <ULink target="_blank"
                    to="https://github.com/iDrack/express-plate/releases">
                    https://github.com/iDrack/express-plate/releases</ULink>.
            </p>
            <p class="pl-4"> A docker-compose file containing a Postgres database and a Redis instance is available to get you
                started quickly.
            </p>
        </div>
        <div class="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] gap-8 md:items-start">
            <div>
                <h2 class="text-2xl font-semibold pb-4">
                    Features
                </h2>
                <ul class="list-disc list-inside pl-4 space-y-1">
                    <li>Relational database</li>
                    <li>Authentification and role management (JWT)</li>
                    <li>ORM</li>
                    <li>Api Documentation with Swagger</li>
                    <li>File transfert</li>
                    <li>Password reset with unique request token</li>
                    <li>Health check</li>
                    <li>Unit test already setup</li>
                </ul>
            </div>

            <USeparator orientation="vertical" color="neutral" type="solid" size="sm" class="hidden md:block" />

            <div>
                <h2 class="text-2xl font-semibold pb-4">
                    Dependencies
                </h2>
                <ul class="list-disc list-inside pl-4 space-y-1">
                    <li>Typescript</li>
                    <li>Express</li>
                    <li>TypeORM</li>
                    <li>PostgreSQL (Database)</li>
                    <li>Multer (File transfert)</li>
                    <li>jswonwebtoken</li>
                    <li>Swagger-ui-express & swagger-jsdoc (API docs)</li>
                    <li>nodemailer (email sending)</li>
                    <li>jest (unit testing)</li>
                    <li>bcrypt (password hashing)</li>
                    <li>Redis</li>
                </ul>
            </div>
        </div>


    </div>
</template>

<style scoped></style>