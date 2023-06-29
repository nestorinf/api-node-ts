/*
  Warnings:

  - The primary key for the `MenuToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `MenuToUser` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`userId`, `menuId`);
