# Product Calculation 

> **[도구 설치](./도구설치.md)**

## 업무파트 산출요청 API 작성 가이드 [개념 모델]

* ### JavaDoc 형식으로 Interface 작성    
    * #### 개념수준의 모델 정의이므로 type<sup>_(parameter & return)_</sup> 및 List<sup>_(입급내역 등)_</sup> 는 고려하지 않기로 함
        <code>
        <details>
         <summary>더보기</summary>
         <p>
               
	    * (편의상) default로 parameter type은 int, return type은 void로 하기로 함
		    * 명확한 type을 알고 있다면 그 type으로 지정해도 무방
		* overloading을 사용할 필요가 있을 경우 다른 type으로 지정
		* <a href="http://www.oracle.com/technetwork/java/javase/documentation/index-137868.html#format" target="_blank">공식 사이트 JavaDoc 참조</a>
		 </p>
        </details>
        </code>
	> ==type 및 List는 리팩토링을 하면서 반복 점진적으로 정제해나갈 예정==


<br>

* ### java code로 작성
    * ==parameter== 
        * ==산출_산출방법서_기반.input_불변객체 package Class 참고==
        * ++`작성 시점에 파악된 내용까지만 기술하면 됨`++ (산출 담당자와 공동으로 작업하는 영역이므 반복 점진적으로 보완해 나갈 것임)
    * ==산출_산출방법서_기반 package 내의 interface 참고==   
    ```java
        /**
         * 사용목적 기술(가급적 상세하게 작성 요망)
         *
         * @param 입력값 입력값에 대한 정의 기술(가급적 상세하게 작성 요망)
         */
        void 필요금액(int 입력값);
        // parameter type은 default로 int, return type은 default로 void
        // 의미전달을 정확히 하기 위해 한글로 작성(영문이 더 명확할 경우에는 영문으로 작성)
    ```

    <details>
     <summary>작성 예시</summary>
     <p>
     <!-- 여기에 빈 칸이 있어야 정상적으로 적용이 됨-->
     
    ```java 업무파트_산출요청_API.가입설계_qi.산출요청_산출방법서_기반_API.java
    업무파트_산출요청_API.가입설계_qi.산출요청_산출방법서_기반_API.java
    
        /**
         * 해지환급금 예시표에 사용하기 위한 금액
         * @param 증권번호 증권번호만으로 계약정보를 산출 자체적으로 획득하는 용도
         */
        void 계약자적립금(int 증권번호);
    
    ...
    
        /**
         * 연금 개시후의 연금관련 예시표에 사용하기 위한 금액
         * @param 계약정보 계약정보를 모두 전달가능
         * @param 계약정보_연금 연금상품과 관련된 계약정보를 모두 전달가능
         */
        void 계약자적립금(계약정보 계약정보, 계약정보_연금 계약정보_연금);
    ```
    </p>
    </details>

<br>

* ### package를 단위업무 단위로 분할 및 API skeleton code file을 이미 생성해 두었음
    * interface file 내의 method 를 작성하면 됨
        <details>
         <summary>더보기</summary>
         <p>
         <!-- 여기에 빈 칸이 있어야 정상적으로 적용이 됨-->
         
         ![](.README_images1/f8305a3a.png)
        </p>
        </details>


### Related Documents
- <a href="./JavaDoc/index.html" target="_blank">JavaDoc (product-calculation)</a>
- <a href="./Excel/CalculationInOut.xlsx" target="_blank">CalculationInOut.xlsx</a>
- <a href="./Excel/CalculationInterface.png" target="_blank">CalculationInterface.png</a>
- <a href="./도구설치.md" target="_blank">도구설치.md</a>
