USE [EcotricityExample]
GO
/****** Object:  Table [dbo].[MeterPointTypes]    Script Date: 18/11/2019 13:54:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MeterPointTypes](
	[MeterPointTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Type] [varchar](4) NOT NULL,
	[Usage] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_MeterPoints] PRIMARY KEY CLUSTERED 
(
	[MeterPointTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 18/11/2019 13:54:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[CustomerId] [varchar](20) NOT NULL,
	[SerialNumber] [varchar](15) NOT NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[CustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CustomersMeterReadings]    Script Date: 18/11/2019 13:54:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomersMeterReadings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CustomerId] [varchar](20) NOT NULL,
	[MeterPointId] [int] NOT NULL,
	[Timing] [varchar](50) NOT NULL,
	[RegisterId] [varchar](50) NOT NULL,
	[Value] [varchar](50) NOT NULL,
	[ReadingDate] [datetime] NOT NULL,
 CONSTRAINT [PK_CustomersMeterPoints] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MeterPoints]    Script Date: 18/11/2019 13:54:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MeterPoints](
	[MeterPointId] [int] NOT NULL,
	[MeterPointTypeId] [int] NOT NULL,
 CONSTRAINT [PK_MeterPoints_1] PRIMARY KEY CLUSTERED 
(
	[MeterPointId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[CustomerMeterReadingsView]    Script Date: 18/11/2019 13:54:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[CustomerMeterReadingsView]
AS
SELECT        c.CustomerId, c.SerialNumber, t.Type, p.MeterPointId, r.Timing, r.RegisterId, r.Value, r.ReadingDate
FROM            dbo.Customers AS c INNER JOIN
                         dbo.CustomersMeterReadings AS r ON c.CustomerId = r.CustomerId INNER JOIN
                         dbo.MeterPoints AS p ON r.MeterPointId = p.MeterPointId INNER JOIN
                         dbo.MeterPointTypes AS t ON p.MeterPointTypeId = t.MeterPointTypeId
GO
ALTER TABLE [dbo].[MeterPointTypes] ADD  CONSTRAINT [DF_MeterPoints_Usage]  DEFAULT (N'Electric') FOR [Usage]
GO
ALTER TABLE [dbo].[CustomersMeterReadings]  WITH CHECK ADD  CONSTRAINT [FK_CustomersMeterPoints_Customer] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([CustomerId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CustomersMeterReadings] CHECK CONSTRAINT [FK_CustomersMeterPoints_Customer]
GO
ALTER TABLE [dbo].[CustomersMeterReadings]  WITH CHECK ADD  CONSTRAINT [FK_CustomersMeterPoints_MeterPoints] FOREIGN KEY([MeterPointId])
REFERENCES [dbo].[MeterPoints] ([MeterPointId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CustomersMeterReadings] CHECK CONSTRAINT [FK_CustomersMeterPoints_MeterPoints]
GO
ALTER TABLE [dbo].[MeterPoints]  WITH CHECK ADD  CONSTRAINT [FK_MeterPoints_MeterPointTypes] FOREIGN KEY([MeterPointTypeId])
REFERENCES [dbo].[MeterPointTypes] ([MeterPointTypeId])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[MeterPoints] CHECK CONSTRAINT [FK_MeterPoints_MeterPointTypes]
GO
/****** Object:  StoredProcedure [dbo].[InsertMeterReading]    Script Date: 18/11/2019 13:54:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [dbo].[InsertMeterReading]
(
    /*CustomerId, SerialNumber, Type, MeterPointId, Timing, RegisterId, Value, ReadingDate*/
	@customerId varchar(20),
	@serialNumber varchar(15),
	@type varchar(4),
	@meterPointId int,
	@registerId varchar(50),
	@timing1 varchar(50),
	@value1 varchar(50),
	@timing2 varchar(50),
	@value2 varchar(50),
	@readingDate datetime,
	@resultMessage varchar(200) OUTPUT
)
AS
BEGIN transaction
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON
	
	-- check exact item is not in customers meter readings table	
	if exists (select 1 from CustomerMeterReadingsView 
		where CustomerId = @customerId
		and SerialNumber = @serialNumber
		and Type = @type
		and MeterPointId = @meterPointId
		and Timing = @timing1
		and RegisterId = @registerId
		and Value = @value1
		and ReadingDate = @readingDate)
		return 'Existing record found, aborting';
	
	if exists (select 1 from CustomerMeterReadingsView 
		where CustomerId = @customerId
		and SerialNumber = @serialNumber
		and Type = @type
		and MeterPointId = @meterPointId
		and Timing = @timing2
		and RegisterId = @registerId
		and Value = @value2
		and ReadingDate = @readingDate)
		return 'Existing record found, aborting';

    -- check customer table for id
    if not exists(select 1 from Customers where CustomerId = @customerId)
	--	 create customer
	begin try
		insert into Customers(CustomerId, SerialNumber)
		values(@customerId, @serialNumber)
    end try
	begin catch
		return 'Unable to create customer';
	end catch
	-- check meterpoints table for meterpoint number
	if not exists(select 1 from MeterPoints where MeterPointId = @meterPointId)
	--   trans: create meter point
	begin try
		insert into MeterPoints(MeterPointId, MeterPointTypeId)
		values(@meterPointId, (select MeterPointTypeId from MeterPointTypes where @type = Type))
	end try
	begin catch
		return 'Unable to create meter point';
	end catch
	--   trans: create meter reading item
	begin try
		insert into CustomersMeterReadings(CustomerId, MeterPointId, ReadingDate, RegisterId, Timing, Value)
		values(@customerId, @meterPointId, @readingDate, @registerId, @timing1, @value1)
	end try
	begin catch
		return 'Unable to create meter reading entry (1)';
	end catch
	begin try
		insert into CustomersMeterReadings(CustomerId, MeterPointId, ReadingDate, RegisterId, Timing, Value)
		values(@customerId, @meterPointId, @readingDate, @registerId, @timing2, @value2)
	end try
	begin catch
		return 'Unable to create meter reading entry (2)';
	end catch
COMMIT
GO
