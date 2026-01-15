# Getting Started with AISI Protocol

This guide will help you publish and discover your first AISI-compliant service in under 5 minutes.

## Step 1: Generate Your Service Form
We provide a web-based tool to create your service description.
1.  Open the file `tools/service-generator.html` in your browser.
2.  Fill in the basic details: **Service ID**, **Name**, and select a **Service Type**.
3.  Add details in the `extensions` section specific to your service type (e.g., `dish` for food delivery).
4.  Click **“Generate JSON”**. This creates a valid AISI v1.0 `AtomicService` JSON object.
5.  Save this JSON as a file (e.g., `my-pizza-service.json`).

## Step 2: Validate Your Form
Use our CLI validator to ensure your JSON is correct.
1.  Navigate to the tool directory: `cd tools/cli-validator-ts`.
2.  Install dependencies: `npm install`.
3.  Run the validator on your file:
    ```bash
    npm start -- validate ../my-pizza-service.json
    ```
    A success message confirms your file is valid.

## Step 3: Run a Local Discovery Platform
See how an agent would discover your service.
1.  Ensure Docker and Docker Compose are installed.
2.  From the project root, run:
    ```bash
    docker-compose -f tools/platform-docker-compose.yml up
    ```
3.  This starts a local platform. Visit `http://localhost:8080/.well-known/aisi.json` to see the platform manifest listing services.

## Step 4: Make Your Service Discoverable
To publish your service:
1.  Place your service JSON file (e.g., `my-pizza-service.json`) in a publicly accessible location under your domain.
2.  Update your platform's `/.well-known/aisi.json` manifest to include your service's `id` in the `services` array.

## Next Steps
- Read the full [Specification](./SPECIFICATION.md).
- Explore the [example service forms](./examples/) for `food_delivery`, `device_repair`, and `digital_service`.
- Contribute to the ecosystem via our [Contribution Guide](./CONTRIBUTING.md).