CREATE TABLE `inspection_clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientEmail` varchar(320) NOT NULL,
	`siteName` varchar(255) NOT NULL,
	`siteAddress` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inspection_clients_id` PRIMARY KEY(`id`),
	CONSTRAINT `inspection_clients_clientName_unique` UNIQUE(`clientName`)
);
