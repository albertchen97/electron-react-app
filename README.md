# electron react resource monitor

## todo

- [x] add an IPC bus to ensure secure communication between the main process and the renderer process
  - [x] create a preload.cts to expose the priviledged APIs to the "Main World"
  - [x] send the static data from the Main process to the Renderer process
