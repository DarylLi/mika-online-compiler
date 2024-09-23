use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello,I'am{}!!", name));
}

// cargo build --target=wasm32-unknown-unknown
// wasm-bindgen target/wasm32-unknown-unknown/debug/wasm_ex.wasm --out-dir ./pkg
