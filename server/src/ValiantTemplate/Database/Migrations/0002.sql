-- Id: 2
-- Description: Create ASP.NET identity tables.

create table [AspNetRoles] (
    [Id] text not null,
    [Name] text null,
    [NormalizedName] text null,
    [ConcurrencyStamp] text null,
    constraint [PK_AspNetRoles] primary key ([Id])
);

create unique index [UX_AspNetRoles_NormalizedName] on [AspNetRoles] ([NormalizedName]) where [NormalizedName] is not null;

create table [AspNetRoleClaims] (
    [Id] integer not null,
    [RoleId] text not null,
    [ClaimType] text null,
    [ClaimValue] text null,
    constraint [PK_AspNetRoleClaims] primary key ([Id]),
    constraint [FK_AspNetRoleClaims_AspNetRoles_RoleId] foreign key ([RoleId]) references [AspNetRoles] ([Id]) on delete cascade
);

create index [IX_AspNetRoleClaims_RoleId] on [AspNetRoleClaims] ([RoleId]);

create table [AspNetUsers] (
    [Id] text not null,
    [UserName] text null,
    [NormalizedUserName] text null,
    [Email] text null,
    [NormalizedEmail] text null,
    [EmailConfirmed] integer not null,
    [PasswordHash] text null,
    [SecurityStamp] text null,
    [ConcurrencyStamp] text null,
    [PhoneNumber] text null,
    [PhoneNumberConfirmed] integer not null,
    [TwoFactorEnabled] integer not null,
    [LockoutEnd] text null,
    [LockoutEnabled] integer not null,
    [AccessFailedCount] integer not null,
    constraint [PK_AspNetUsers] primary key ([Id])
);

create unique index [UX_AspNetUsers_NormalizedUserName] on [AspNetUsers] ([NormalizedUserName]) where [NormalizedUserName] is not null;

create index [IX_AspNetUsers_NormalizedEmail] on [AspNetUsers] ([NormalizedEmail]);

create table [AspNetUserClaims] (
    [Id] integer not null,
    [UserId] text not null,
    [ClaimType] text null,
    [ClaimValue] text null,
    constraint [PK_AspNetUserClaims] primary key ([Id]),
    constraint [FK_AspNetUserClaims_AspNetUsers_UserId] foreign key ([UserId]) references [AspNetUsers] ([Id]) on delete cascade
);

create index [IX_AspNetUserClaims_UserId] on [AspNetUserClaims] ([UserId]);

create table [AspNetUserLogins] (
    [LoginProvider] text not null,
    [ProviderKey] text not null,
    [ProviderDisplayName] text null,
    [UserId] text not null,
    constraint [PK_AspNetUserLogins] primary key ([LoginProvider], [ProviderKey]),
    constraint [FK_AspNetUserLogins_AspNetUsers_UserId] foreign key ([UserId]) references [AspNetUsers] ([Id]) on delete cascade
);

create index [IX_AspNetUserLogins_UserId] on [AspNetUserLogins] ([UserId]);

create table [AspNetUserRoles] (
    [UserId] text not null,
    [RoleId] text not null,
    constraint [PK_AspNetUserRoles] primary key ([UserId], [RoleId]),
    constraint [FK_AspNetUserRoles_AspNetRoles_RoleId] foreign key ([RoleId]) references [AspNetRoles] ([Id]) on delete cascade,
    constraint [FK_AspNetUserRoles_AspNetUsers_UserId] foreign key ([UserId]) references [AspNetUsers] ([Id]) on delete cascade
);

create index [IX_AspNetUserRoles_RoleId] on [AspNetUserRoles] ([RoleId]);

create table [AspNetUserTokens] (
    [UserId] text not null,
    [LoginProvider] text not null,
    [Name] text not null,
    [Value] text null,
    constraint [PK_AspNetUserTokens] primary key ([UserId], [LoginProvider], [Name]),
    constraint [FK_AspNetUserTokens_AspNetUsers_UserId] foreign key ([UserId]) references [AspNetUsers] ([Id]) on delete cascade
);
