import { prisma } from "../lib/prisma.js";

export async function getCampaignsController(req, res) {
  const campaigns = await prisma.campaign.findMany({ where: { isActive: true } });
  res.json(campaigns);
}

export async function getBannersController(req, res) {
  const banners = await prisma.banner.findMany({ where: { isActive: true } });
  res.json(banners);
}
