// package com.example.User_Input.Dto;

// public class InputDto {
//     private Long id;
//     private Double builtupArea;

//     public InputDto(Long id, Double builtupArea) {
//         this.id = id;
//         this.builtupArea = builtupArea;
//     }

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public Double getBuiltupArea() {
//         return builtupArea;
//     }

//     public void setBuiltupArea(Double builtupArea) {
//         this.builtupArea = builtupArea;
//     }
//     public InputDto() {
//     }
    
// }


package com.example.User_Input.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InputDto {
    private Long id;
    private Double builtupArea;
    private Long phoneNumber;
    private String userEmail;
    private String userName;
    private String city;
    private String state;
    private String constructionType;
    private int totalFloor;
    private String propName;
    private Boolean landclearence;
    private String materialQuality;
    private Long constructionId;
}
