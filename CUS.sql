﻿CREATE
-- ALTER
FUNCTION REGIS_IDCUS()
RETURNS CHAR(5)
AS
BEGIN
	DECLARE @ID CHAR(5)
	IF(NOT EXISTS (SELECT *
				   FROM CUSTOMERS))
	BEGIN
		SET @ID = 'KH001'
		RETURN @ID
	END
	ELSE
	BEGIN
		SELECT @ID = CAST(CAST(MAX(RIGHT(ID_lOGIN,3)) AS INT) + 1 AS CHAR(5))
		FROM ACCOUNT
	END

	DECLARE @TEMP INT = CAST(@ID AS INT)
	DECLARE @COUNT INT = 0

	WHILE(@TEMP >0)
	BEGIN
		SET @TEMP = @TEMP/10
		SET @COUNT = @COUNT + 1
	end
    
	DECLARE @CNT int =0
	WHILE(@CNT <> (3-@COUNT))
	BEGIN
		SET @ID = '0' + @ID
		SET @CNT = @CNT + 1
	END
	SET @ID = 'KH' + @ID
	RETURN @ID
END

CREATE
-- ALTER
PROC REGIS_CUS(
	@NAME NVARCHAR(80),
	@PASS CHAR(20),
	@BIRTHDAY DATE,
	@ADDRESS NVARCHAR(100),
	@EMAIL CHAR(20),
	@PHONE CHAR(10)
)
AS
BEGIN TRANSACTION
	BEGIN TRY
		IF(EXISTS (SELECT *
				   FROM ACCOUNT
				   WHERE USERNAME = @PHONE))
		BEGIN
			ROLLBACK TRANSACTION
			RETURN 1
		END

		IF(CHARINDEX('@',@EMAIL) = 0)
		BEGIN
			ROLLBACK TRANSACTION
			RETURN 1
		END
	END TRY

	BEGIN CATCH
		PRINT(N'THÔNG TIN KHÔNG HỢP LỆ !')
	END CATCH

	DECLARE @IDCUS CHAR(5) = DBO.REGIS_IDCUS()
	INSERT INTO ACCOUNT VALUES (@IDCUS,@PHONE,@PASS,GETDATE(),N'KHÁCH HÀNG')
	INSERT INTO CUSTOMERS VALUES (@IDCUS,@NAME,@BIRTHDAY,@ADDRESS,@EMAIL,@PHONE)
COMMIT TRANSACTION

EXEC REGIS_CUS N'Phúc Ngô','A123','2002-01-31',N'TP HCM','PHUCNGO@123','0834678755'
EXEC REGIS_CUS N'Phúc Hữu','A123','2002-01-31',N'TP HCM','PHUCNGO@123','0834658755'

SELECT * FROM ACCOUNT
SELECT * FROM CUSTOMERS