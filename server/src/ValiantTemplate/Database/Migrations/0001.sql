-- Id: 1
-- Description: Create data protection keys table.

create table [DataProtectionKeys] (
  [Id] integer not null,
  [FriendlyName] text null,
  [Xml] text null,
  constraint [PK_DataProtectionKeys] primary key ([Id])
);
