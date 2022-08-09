#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate machine_uid;

#[tauri::command]
fn get_machine_uid() -> String {
    machine_uid::get().unwrap()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_machine_uid])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
