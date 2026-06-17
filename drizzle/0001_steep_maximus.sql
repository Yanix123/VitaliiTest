CREATE INDEX "favorites_user_id_idx" ON "favorites" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "favorites_created_at_idx" ON "favorites" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "items_created_at_idx" ON "items" USING btree ("created_at");