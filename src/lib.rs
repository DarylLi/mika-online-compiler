use wasm_bindgen::prelude::*;

fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];

    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }

    largest
}
#[wasm_bindgen]
pub fn getMax(list: &[u32]) -> u32 {
    largest(list)
}

fn get_inner_code_type(curr_type: &str) -> &str {
    let match_type = curr_type;
    let result_code = match match_type {
        "refresh_css" => "let _refreshCssCode_ = document.getElementById('innerCssCode')||document.createElement('div');_refreshCssCode_.setAttribute('id','innerCssCode');_refreshCssCode_.innerHTML='';document.getElementById('root').appendChild(_refreshCssCode_);",
        // "css_replace" => "",
        _ => ""
    };

    result_code
}

#[wasm_bindgen]
pub fn getCompiledCode(curr_type: &str) -> String {
    String::from(get_inner_code_type(curr_type))
}
