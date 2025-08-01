// scripts/updateQueueStats.js - Update clinic queue statistics
import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('📊 Updating clinic queue statistics...');

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
import { existsSync } from 'fs';

if (!existsSync(serviceAccountPath)) {
  console.error('❌ Service account key not found!');
  process.exit(1);
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
    projectId: 'clinicconnect-plus'
  });
  console.log('✅ Firebase Admin initialized successfully');
} catch (error) {
  console.error('❌ Error initializing Firebase Admin:', error.message);
  process.exit(1);
}

async function updateAllClinicQueueStats() {
  try {
    console.log('🔄 Updating all clinic queue statistics...');
    
    // Get all clinics
    const clinicsSnapshot = await admin.firestore().collection('clinics').get();
    const clinics = [];
    
    clinicsSnapshot.forEach((doc) => {
      clinics.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`📋 Found ${clinics.length} clinics to update`);
    
    // Update each clinic's queue statistics
    for (const clinic of clinics) {
      console.log(`🔄 Updating queue stats for ${clinic.name}...`);
      
      // Get queue data for this clinic
      const queueSnapshot = await admin.firestore()
        .collection('queue')
        .where('clinicId', '==', clinic.id)
        .where('status', 'in', ['Waiting', 'Called'])
        .get();
      
      const waitingCount = queueSnapshot.docs.filter(
        doc => doc.data().status === 'Waiting'
      ).length;
      
      // Calculate estimated wait time (15 minutes per patient)
      const estimatedWaitMinutes = Math.max(waitingCount * 15, 5);
      
      // Update the clinic document
      await admin.firestore()
        .collection('clinics')
        .doc(clinic.id)
        .update({
          currentQueue: waitingCount,
          estimatedWait: estimatedWaitMinutes,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      
      console.log(`✅ Updated ${clinic.name}: ${waitingCount} in queue, ${estimatedWaitMinutes} min wait`);
    }
    
    console.log('🎉 Successfully updated all clinic queue statistics!');
    
  } catch (error) {
    console.error('❌ Error updating clinic queue stats:', error);
  }
}

// Run the update
updateAllClinicQueueStats()
  .then(() => {
    console.log('✅ Queue statistics update completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Queue statistics update failed:', error);
    process.exit(1);
  }); 